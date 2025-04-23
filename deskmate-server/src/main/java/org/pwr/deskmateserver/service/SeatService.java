package org.pwr.deskmateserver.service;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.dto.seat.CreateSeatDTO;
import org.pwr.deskmateserver.dto.seat.SeatDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.model.entities.Floor;
import org.pwr.deskmateserver.model.entities.Seat;
import org.pwr.deskmateserver.model.entities.SeatFloorLink;
import org.pwr.deskmateserver.repo.FloorRepository;
import org.pwr.deskmateserver.repo.SeatFloorLinkRepository;
import org.pwr.deskmateserver.repo.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SeatService {
    private final SeatRepository seatRepository;

    private final SeatFloorLinkRepository seatFloorLinkRepository;

    private final FloorRepository floorRepository;

    public List<SeatDTO> getByFloorId(Long floorId) throws NotFoundException {
        Optional<Floor> floor = floorRepository.findById(floorId);
        if(floor.isEmpty()) {
            throw new NotFoundException("Floor not found!");
        }

        return seatFloorLinkRepository.findByFloor(floor.get())
            .stream().map(SeatDTO::from).toList();
    }

    public List<SeatDTO> createSeats(Long floorId, List<CreateSeatDTO> seats) throws NotFoundException {
        Optional<Floor> floor = floorRepository.findById(floorId);
        if(floor.isEmpty()) {
            throw new NotFoundException("Floor not found!");
        }

        List<Seat> newSeats = seats.stream().map(
            item -> Seat.builder().x(item.getX()).y(item.getY()).build()
        ).toList();
        List<SeatFloorLink> links = newSeats.stream().map(
            item -> SeatFloorLink.builder().floor(floor.get()).seat(item).build()
        ).toList();

        return seatFloorLinkRepository.saveAll(links).stream().map(SeatDTO::from).toList();
    }

    public List<SeatDTO> removeSeats(List<Long> seats) {
        List<Seat> toDelete = seatRepository.findAllById(seats);
        List<SeatFloorLink> linksToDelete = seatFloorLinkRepository.findAllBySeatIn(toDelete);
        seatFloorLinkRepository.deleteAll(linksToDelete);
        seatRepository.deleteAll(toDelete);

        return toDelete.stream().map(SeatDTO::from).toList();
    }
}
