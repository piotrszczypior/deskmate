package org.pwr.deskmateserver.controller;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.dto.AssetDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.service.AssetService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@AllArgsConstructor
public class AssetController {
    private AssetService assetService;

    @PostMapping("/asset")
    public ResponseEntity<Object> createAsset(MultipartFile file) {
        return ResponseEntity.ok(assetService.createAsset(file));
    }

    @GetMapping("/asset/{filename}")
    public ResponseEntity<Object> getFile(@PathVariable String filename) throws NotFoundException {
        AssetDTO asset = assetService.getAsset(filename);

        return ResponseEntity.ok()
            .contentType(MediaType.valueOf(asset.getMimeType()))
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + asset.getName() + "\"")
            .body(assetService.getResource(asset));
    }
}
