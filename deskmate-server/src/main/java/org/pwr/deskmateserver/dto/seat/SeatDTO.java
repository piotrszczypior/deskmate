package org.pwr.deskmateserver.dto.seat;

import lombok.*;
import org.pwr.deskmateserver.model.entities.Seat;
import org.pwr.deskmateserver.model.entities.SeatFloorLink;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatDTO {
    private Long id;

    private Long x;

    private Long y;

    public static SeatDTO from(Seat seat) {
        return SeatDTO.builder()
            .id(seat.getId())
            .x(seat.getX())
            .y(seat.getY())
            .build();
    }

    public static SeatDTO from(SeatFloorLink seatFloorLink) {
        return SeatDTO.from(seatFloorLink.getSeat());
    }
}
