package org.pwr.deskmateserver.repo;

import org.pwr.deskmateserver.model.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByWorkerId(Long workerId);

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.seat.id = :seatId
          AND (CAST(:from AS timestamp) IS NULL OR r.endDate >= :from)
          AND (CAST(:to AS timestamp) IS NULL OR r.startDate <= :to)
          AND r.endDate >= CURRENT_TIMESTAMP
    """)
    List<Reservation> findActiveBySeatIdWithOptionalDateRange(
        @Param("seatId") Long seatId,
        @Param("from") Long from,
        @Param("to") Long to
    );

    @Query("""
        SELECT r FROM Reservation r 
        WHERE r.seat.id = :seatId 
        AND r.startDate < :to AND r.endDate > :from
    """)
    List<Reservation> findOverlappingReservations(
        @Param("seatId") Long seatId,
        @Param("from") Date from,
        @Param("to") Date to
    );

    @Query("""
        SELECT r FROM Reservation r 
        WHERE r.seat.id IN :seatIds 
          AND r.startDate < :to 
          AND r.endDate > :from
    """)
    List<Reservation> findOverlappingReservationsForSeats(
        @Param("seatIds") List<Long> seatIds,
        @Param("from") Date from,
        @Param("to") Date to
    );
}
