package org.pwr.deskmateserver.dto;

import lombok.*;
import org.pwr.deskmateserver.model.entities.Asset;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class AssetDTO {
    private Long id;

    private String name;

    /**
     * Remote path to the asset.
     */
    private String path;

    private String mimeType;

    public static AssetDTO from(Asset asset) {
        return AssetDTO.builder()
            .id(asset.getId())
            .name(asset.getName())
            .path("/api/v1/asset/" + asset.getName())
            .mimeType(asset.getMimeType())
            .build();
    }
}
