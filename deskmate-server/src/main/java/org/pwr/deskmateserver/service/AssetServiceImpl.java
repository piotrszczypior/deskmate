package org.pwr.deskmateserver.service;

import jakarta.annotation.PostConstruct;
import org.pwr.deskmateserver.dto.AssetDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.model.entities.Asset;
import org.pwr.deskmateserver.repo.AssetRepository;
import org.pwr.deskmateserver.utils.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
public class AssetServiceImpl implements AssetService {
    private final AssetRepository repository;

    @Value("${org.pwr.deskmateserver.storage-path}")
    private String storagePath;

    public AssetServiceImpl(AssetRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    public void setup() {
        File f = Path.of(Objects.requireNonNull(
            storagePath,
            "Storage path cannot be null! Please define it in properties [org.pwr.deskmateserver.storage-path]"
        )).toFile();
        if(!f.exists()) {
            f.mkdirs();
        }
    }

    @Override
    public AssetDTO createAsset(MultipartFile file) {
        String filename = createUniqueFilename(file);
        try {
            Files.write(
                Paths.get(storagePath, filename),
                file.getResource().getContentAsByteArray()
            );
        } catch (Exception e) { throw new RuntimeException(e); }
        Asset asset = Asset.builder()
            .name(filename)
            .path(filename)
            .mimeType(file.getContentType())
            .build();
        repository.save(asset);

        return AssetDTO.from(asset);
    }

    @Override
    public String createUniqueFilename(MultipartFile file) {
        String uuid = UUID.randomUUID().toString();

        return uuid
            + "."
            + FileUtils.getExtension(file.getOriginalFilename());
    }

    @Override
    public AssetDTO getAsset(Long id) throws NotFoundException {
        Optional<Asset> asset = repository.findById(id);
        if(asset.isEmpty()) {
            throw new NotFoundException("Asset not found");
        }

        return AssetDTO.from(asset.get());
    }

    @Override
    public AssetDTO getAsset(String name) throws NotFoundException {
        Optional<Asset> asset = repository.findByName(name);
        if(asset.isEmpty()) {
            throw new NotFoundException("Asset not found");
        }

        return AssetDTO.from(asset.get());
    }

    @Override
    public Resource getResource(AssetDTO asset) throws NotFoundException {
        Optional<Asset> a = repository.findById(asset.getId());

        if(a.isEmpty()) {
            throw new NotFoundException("Asset not found!");
        }

        return new FileSystemResource(Paths.get(storagePath, a.get().getPath()).toString());
    }
}
