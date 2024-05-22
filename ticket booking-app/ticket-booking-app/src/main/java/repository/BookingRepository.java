package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import entity.Booking;
import entity.User;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
}
