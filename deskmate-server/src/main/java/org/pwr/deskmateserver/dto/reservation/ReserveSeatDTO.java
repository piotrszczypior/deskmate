package org.pwr.deskmateserver.dto.reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReserveSeatDTO {
    private Long seatId;
    private Date from;
    private Date to;
}
