package org.pwr.deskmateserver.repo;

import org.pwr.deskmateserver.model.entities.Floor;
import org.pwr.deskmateserver.model.entities.Seat;
import org.pwr.deskmateserver.model.entities.SeatFloorLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatFloorLinkRepository extends JpaRepository<SeatFloorLink, Long> {
    Optional<SeatFloorLink> findBySeat(Seat seat);
    List<SeatFloorLink> findByFloor(Floor floor);
    List<SeatFloorLink> findAllBySeatIn(Iterable<Seat> seats);
}
