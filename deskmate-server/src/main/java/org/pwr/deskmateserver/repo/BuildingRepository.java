package org.pwr.deskmateserver.repo;

import org.pwr.deskmateserver.model.entities.Building;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingRepository extends JpaRepository<Building, Long> {
}
