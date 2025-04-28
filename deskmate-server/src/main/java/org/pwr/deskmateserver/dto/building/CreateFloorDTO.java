package org.pwr.deskmateserver.dto.building;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateFloorDTO extends CreateFloorBaseDTO {
    private Long buildingId;

    public static CreateFloorDTO from(CreateFloorBaseDTO dto, Long buildingId) {
        CreateFloorDTO result = new CreateFloorDTO();
        result.setName(dto.getName());
        result.setAssetId(dto.getAssetId());
        result.setBuildingId(buildingId);

        return result;
    }
}
