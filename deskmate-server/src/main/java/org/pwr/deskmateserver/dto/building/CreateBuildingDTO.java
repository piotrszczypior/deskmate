package org.pwr.deskmateserver.dto.building;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateBuildingDTO {
    private String name;

    private List<CreateFloorBaseDTO> floors;
}
