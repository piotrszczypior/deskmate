package org.pwr.deskmateserver.controller;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.dto.UserDTO;
import org.pwr.deskmateserver.dto.reservation.ReserveSeatDTO;
import org.pwr.deskmateserver.exceptions.CollisionException;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1")
@RestController
@AllArgsConstructor
public class ReservationController {
    private ReservationService reservationService;

    @PostMapping("/reserve")
    public ResponseEntity<Object> reserveSeat(@RequestBody ReserveSeatDTO reserveSeatDTO, Authentication authentication) throws CollisionException, NotFoundException {
        return ResponseEntity.ok(this.reservationService.reserveSeat(reserveSeatDTO));
    }

    @GetMapping("/reservations/seat/{id}")
    public ResponseEntity<Object> getReservationsForSeat(
        @PathVariable Long id,
        @RequestParam Long from,
        @RequestParam Long to
    ) throws NotFoundException {
        return ResponseEntity.ok(this.reservationService.getReservationsForSeat(id, from, to));
    }

    @GetMapping("/reservations/floor/{id}")
    public ResponseEntity<Object> getReservationsForFloor(
        @PathVariable Long id,
        @RequestParam Long from,
        @RequestParam Long to
    ) throws NotFoundException {
        return ResponseEntity.ok(this.reservationService.getReservationsByFloor(id, from, to));
    }

    @GetMapping("/reservations/my")
    public ResponseEntity<Object> getMyReservations() throws NotFoundException {
        return ResponseEntity.ok(this.reservationService.getReservationsForUser());
    }
}
