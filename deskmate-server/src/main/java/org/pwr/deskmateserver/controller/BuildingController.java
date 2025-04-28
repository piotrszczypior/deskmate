package org.pwr.deskmateserver.controller;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.dto.building.CreateBuildingDTO;
import org.pwr.deskmateserver.dto.building.CreateFloorDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.service.BuildingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/v1/")
@RestController
@AllArgsConstructor
public class BuildingController {
    private BuildingService buildingService;

    @GetMapping("/buildings")
    public ResponseEntity<Object> getBuildings() {
        return ResponseEntity.ok(buildingService.getAll());
    }

    @GetMapping("/buildings/{id}")
    public ResponseEntity<Object> getBuildings(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(buildingService.getOne(id));
    }

    @PostMapping("/buildings")
    public ResponseEntity<Object> createBuilding(@RequestBody CreateBuildingDTO building) throws NotFoundException {
        return ResponseEntity.ok(buildingService.createBuilding(building));
    }

    @PostMapping("/building/floor")
    public ResponseEntity<Object> addFloor(@RequestBody CreateFloorDTO floorDTO) throws NotFoundException {
        return ResponseEntity.ok(buildingService.createFloor(floorDTO));
    }
}
