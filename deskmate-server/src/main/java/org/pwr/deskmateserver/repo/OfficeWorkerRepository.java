package org.pwr.deskmateserver.repo;

import org.pwr.deskmateserver.model.entities.OfficeWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfficeWorkerRepository extends JpaRepository<OfficeWorker, Long> {
}
