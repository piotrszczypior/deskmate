package org.pwr.deskmateserver.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.pwr.deskmateserver.dto.UserDTO;
import org.pwr.deskmateserver.dto.reservation.ReservationDTO;
import org.pwr.deskmateserver.dto.reservation.ReserveSeatDTO;
import org.pwr.deskmateserver.exceptions.CollisionException;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.model.entities.OfficeWorker;
import org.pwr.deskmateserver.model.entities.Reservation;
import org.pwr.deskmateserver.model.entities.Seat;
import org.pwr.deskmateserver.model.entities.User;
import org.pwr.deskmateserver.repo.OfficeWorkerRepository;
import org.pwr.deskmateserver.repo.ReservationRepository;
import org.pwr.deskmateserver.repo.SeatRepository;
import org.pwr.deskmateserver.repo.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final SeatRepository seatRepository;
    private final UserRepository userRepository;
    private final OfficeWorkerRepository workerRepository;

    @Transactional
    public ReservationDTO reserveSeat(ReserveSeatDTO newReservation) throws NotFoundException, CollisionException {
        UserDTO userDTO = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findById(userDTO.getId());
        if(user.isEmpty()) {
            throw new NotFoundException("User not found!");
        }

        Optional<OfficeWorker> officeWorker = workerRepository.findByUser(user.get());
        if(officeWorker.isEmpty()) {
            throw new NotFoundException("Office worker not found!");
        }

        Optional<Seat> seat = seatRepository.findById(newReservation.getSeatId());
        if(seat.isEmpty()) {
            throw new NotFoundException("Seat not found!");
        }

        if (!isSeatAvailable(seat.get(), newReservation.getFrom(), newReservation.getTo())) {
            throw new CollisionException("Seat is already reserved for the given time period.");
        }

        Reservation reservation = Reservation.builder()
            .worker(officeWorker.get())
            .seat(seat.get())
            .startDate(newReservation.getFrom())
            .endDate(newReservation.getTo())
            .build();

        return ReservationDTO.from(reservationRepository.save(reservation));
    }

    public boolean isSeatAvailable(Seat seat, Date from, Date to) {
        List<Reservation> overlappingReservations = reservationRepository.findOverlappingReservations(seat.getId(), from, to);
        return overlappingReservations.isEmpty();
    }

    public List<Reservation> getReservationsForUser(OfficeWorker worker) {
        return reservationRepository.findAllByWorkerId(worker.getId());
    }

    public List<ReservationDTO> getReservationsForSeat(Long seatId, Long from, Long to) throws NotFoundException {
        Optional<Seat> seat = seatRepository.findById(seatId);
        if(seat.isEmpty()) {
            throw new NotFoundException("Seat not found!");
        }

        return reservationRepository.findActiveBySeatIdWithOptionalDateRange(seat.get().getId(), from, to).stream().map(ReservationDTO::from).toList();
    }
}