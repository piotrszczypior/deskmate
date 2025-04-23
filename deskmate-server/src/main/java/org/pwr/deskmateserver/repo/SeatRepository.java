package org.pwr.deskmateserver.repo;

import org.pwr.deskmateserver.model.entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}
