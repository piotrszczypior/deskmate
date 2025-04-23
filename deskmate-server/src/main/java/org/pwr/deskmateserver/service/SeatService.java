package org.pwr.deskmateserver.service;

import org.pwr.deskmateserver.dto.seat.CreateSeatDTO;
import org.pwr.deskmateserver.dto.seat.SeatDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;

import java.util.List;

public interface SeatService {
    List<SeatDTO> getByFloorId(Long floorId) throws NotFoundException;

    List<SeatDTO> createSeats(Long floorId, List<CreateSeatDTO> seats) throws NotFoundException;

    List<SeatDTO> removeSeats(List<Long> seats);
}
