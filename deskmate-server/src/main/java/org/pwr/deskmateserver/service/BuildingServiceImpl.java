package org.pwr.deskmateserver.service;

import lombok.AllArgsConstructor;
import org.pwr.deskmateserver.dto.building.*;
import org.pwr.deskmateserver.exceptions.NotFoundException;
import org.pwr.deskmateserver.model.entities.Asset;
import org.pwr.deskmateserver.model.entities.Building;
import org.pwr.deskmateserver.model.entities.Floor;
import org.pwr.deskmateserver.repo.AssetRepository;
import org.pwr.deskmateserver.repo.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class BuildingServiceImpl {
    private BuildingRepository repository;

    private AssetRepository assetRepository;

    public List<BuildingDTO> getAll() {
        return repository.findAll().stream().map(BuildingDTO::from).toList();
    }

    public BuildingDTO getOne(Long id) throws NotFoundException {
        Optional<Building> b = repository.findById(id);

        if(b.isEmpty()) {
            throw new NotFoundException("Building not found!");
        }

        return BuildingDTO.from(b.get());
    }

    public BuildingDTO createBuilding(CreateBuildingDTO building) throws NotFoundException {
        Building newBuilding = Building.builder()
            .name(building.getName())
            .build();
        repository.save(newBuilding);
        for(CreateFloorBaseDTO floorDTO : building.getFloors()) {
            createFloor(CreateFloorDTO.from(floorDTO, newBuilding.getId()));
        }

        return BuildingDTO.from(repository.findById(newBuilding.getId()).get());
    }

    public FloorDTO createFloor(CreateFloorDTO floorDTO) throws NotFoundException {
        Optional<Building> building = repository.findById(floorDTO.getBuildingId());
        Optional<Asset> asset = assetRepository.findById(floorDTO.getAssetId());

        if(building.isEmpty()) {
            throw new NotFoundException("Building not found!");
        }

        if(asset.isEmpty()) {
            throw new NotFoundException("Asset not found!");
        }

        Floor floor = Floor.builder()
            .floorPlan(asset.get())
            .name(floorDTO.getName())
            .build();

        building.get().addFloor(floor);
        repository.save(building.get());

        return FloorDTO.from(floor);
    }
}
