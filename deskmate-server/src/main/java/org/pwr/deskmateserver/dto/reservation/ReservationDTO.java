package org.pwr.deskmateserver.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.pwr.deskmateserver.dto.OfficeWorkerDTO;
import org.pwr.deskmateserver.dto.UserDTO;
import org.pwr.deskmateserver.dto.seat.SeatDTO;
import org.pwr.deskmateserver.model.entities.Reservation;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationDTO {
    private OfficeWorkerDTO worker;
    private SeatDTO seat;
    private Date from;
    private Date to;

    public static ReservationDTO from(Reservation reservation) {
        return ReservationDTO.builder()
            .from(reservation.getStartDate())
            .to(reservation.getEndDate())
            .seat(SeatDTO.from(reservation.getSeat()))
            .worker(OfficeWorkerDTO.from(reservation.getWorker()))
            .build();
    }
}
