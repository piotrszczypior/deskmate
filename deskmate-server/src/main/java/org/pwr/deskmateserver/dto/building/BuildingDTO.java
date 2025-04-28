package org.pwr.deskmateserver.dto.building;

import jakarta.persistence.OneToMany;
import lombok.*;
import org.pwr.deskmateserver.model.entities.Building;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BuildingDTO {
    private Long id;

    private String name;

    @OneToMany
    private List<FloorDTO> floors;

    public static BuildingDTO from(Building building) {
        return BuildingDTO.builder()
            .id(building.getId())
            .name(building.getName())
            .floors(building.getFloorList().stream().map(FloorDTO::from).toList())
            .build();
    }
}
