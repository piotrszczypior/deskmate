package org.pwr.deskmateserver.dto.building;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateFloorBaseDTO {
    private String name;

    private Long assetId;
}
