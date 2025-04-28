package org.pwr.deskmateserver.dto.building;

import lombok.*;
import org.pwr.deskmateserver.dto.AssetDTO;
import org.pwr.deskmateserver.model.entities.Floor;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FloorDTO {
    private Long id;

    private String name;

    private AssetDTO floorPlan;

    public static FloorDTO from(Floor floor) {
        return FloorDTO.builder()
            .id(floor.getId())
            .name(floor.getName())
            .floorPlan(AssetDTO.from(floor.getFloorPlan()))
            .build();
    }
}
