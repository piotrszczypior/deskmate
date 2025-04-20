package org.pwr.deskmateserver.service;

import org.pwr.deskmateserver.dto.AssetDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;


public interface AssetService {
    AssetDTO createAsset(MultipartFile file);

    String createUniqueFilename(MultipartFile file);

    AssetDTO getAsset(Long id) throws NotFoundException;

    AssetDTO getAsset(String name) throws NotFoundException;

    Resource getResource(AssetDTO asset) throws NotFoundException;
}
