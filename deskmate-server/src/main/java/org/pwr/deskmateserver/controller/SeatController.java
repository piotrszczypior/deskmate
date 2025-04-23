package org.pwr.deskmateserver.controller;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.dto.seat.CreateSeatDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.service.SeatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequestMapping("/api/v1/")
@RestController
@AllArgsConstructor
public class SeatController {
    private final SeatService seatService;

    @GetMapping("/seats/{floorId}")
    public ResponseEntity<?> getSeats(@PathVariable Long floorId) throws NotFoundException {
        return ResponseEntity.ok(seatService.getByFloorId(floorId));
    }

    @PostMapping("/seats/{floorId}")
    public ResponseEntity<?> createSeats(
        @PathVariable Long floorId,
        @RequestBody List<CreateSeatDTO> seats
    ) throws NotFoundException {
        return ResponseEntity.ok(seatService.createSeats(floorId, seats));
    }

    @DeleteMapping("/seats")
    public ResponseEntity<?> removeSeats(@RequestBody List<Long> seats) {
        return ResponseEntity.ok(seatService.removeSeats(seats));
    }
}
