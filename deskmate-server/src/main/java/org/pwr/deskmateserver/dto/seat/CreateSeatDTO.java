package org.pwr.deskmateserver.dto.seat;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateSeatDTO {
    private Long floorId;

    private Long x;

    private Long y;
}
