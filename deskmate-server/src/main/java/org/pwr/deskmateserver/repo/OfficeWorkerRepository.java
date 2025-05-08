package org.pwr.deskmateserver.repo;

import org.pwr.deskmateserver.model.entities.OfficeWorker;
import org.pwr.deskmateserver.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OfficeWorkerRepository extends JpaRepository<OfficeWorker, Long> {
    Optional<OfficeWorker> findByUser(User user);
}
