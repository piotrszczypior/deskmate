package org.pwr.deskmateserver.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.pwr.deskmateserver.dto.UserDTO;
import org.pwr.deskmateserver.dto.reservation.ReservationDTO;
import org.pwr.deskmateserver.dto.reservation.ReserveSeatDTO;
import org.pwr.deskmateserver.exceptions.CollisionException;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.model.entities.*;
import org.pwr.deskmateserver.repo.*;
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
    private final SeatFloorLinkRepository seatFloorLinkRepository;
    private final FloorRepository floorRepository;

    @Transactional
    public ReservationDTO reserveSeat(ReserveSeatDTO newReservation) throws NotFoundException, CollisionException {
        OfficeWorker officeWorker = getCurrentOfficeWorker();
        Optional<Seat> seat = seatRepository.findById(newReservation.getSeatId());
        if(seat.isEmpty()) {
            throw new NotFoundException("Seat not found!");
        }

        if (!isSeatAvailable(seat.get(), newReservation.getFrom(), newReservation.getTo())) {
            throw new CollisionException("Seat is already reserved for the given time period.");
        }

        Reservation reservation = Reservation.builder()
            .worker(officeWorker)
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

    public List<ReservationDTO> getReservationsForUser() throws NotFoundException {
        OfficeWorker officeWorker = getCurrentOfficeWorker();

        return reservationRepository.findAllByWorkerId(officeWorker.getId()).stream().map(ReservationDTO::from).toList();
    }

    public List<ReservationDTO> getReservationsByFloor(Long floorId, Long from, Long to) throws NotFoundException {
        Optional<Floor> floor = this.floorRepository.findById(floorId);
        if(floor.isEmpty()) {
            throw new NotFoundException("Floor does not exist!");
        }
        List<SeatFloorLink> links = this.seatFloorLinkRepository.findByFloor(floor.get());
        List<Long> seatIds = links.stream().map((s) -> s.getSeat().getId()).toList();
        List<Reservation> reservations = this.reservationRepository.findOverlappingReservationsForSeats(seatIds, new Date(from), new Date(to));

        return reservations.stream().map(ReservationDTO::from).toList();
    }

    public List<ReservationDTO> getReservationsForSeat(Long seatId, Long from, Long to) throws NotFoundException {
        Optional<Seat> seat = seatRepository.findById(seatId);
        if(seat.isEmpty()) {
            throw new NotFoundException("Seat not found!");
        }

        return reservationRepository.findActiveBySeatIdWithOptionalDateRange(seat.get().getId(), from, to).stream().map(ReservationDTO::from).toList();
    }

    private OfficeWorker getCurrentOfficeWorker() throws NotFoundException {
        UserDTO userDTO = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findById(userDTO.getId());
        if(user.isEmpty()) {
            throw new NotFoundException("User not found!");
        }

        Optional<OfficeWorker> officeWorker = workerRepository.findByUser(user.get());
        if(officeWorker.isEmpty()) {
            throw new NotFoundException("Office worker not found!");
        }

        return officeWorker.get();
    }
}