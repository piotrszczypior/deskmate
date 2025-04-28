package org.pwr.deskmateserver.service;

import org.pwr.deskmateserver.dto.building.BuildingDTO;
import org.pwr.deskmateserver.dto.building.CreateBuildingDTO;
import org.pwr.deskmateserver.dto.building.CreateFloorDTO;
import org.pwr.deskmateserver.dto.building.FloorDTO;
import org.pwr.deskmateserver.exceptions.NotFoundException;

import java.util.List;

public interface BuildingService {
    List<BuildingDTO> getAll();

    BuildingDTO getOne(Long id) throws NotFoundException;

    BuildingDTO createBuilding(CreateBuildingDTO building) throws NotFoundException;

    FloorDTO createFloor(CreateFloorDTO floorDTO) throws NotFoundException;
}
