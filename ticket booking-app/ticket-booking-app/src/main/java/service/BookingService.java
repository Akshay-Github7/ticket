package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.Booking;
import entity.User;
import repository.BookingRepository;
import repository.UserRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking createBooking(Long userId, String movie, int seats) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setMovie(movie);
        booking.setSeats(seats);
        return bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        return bookingRepository.findByUser(user);
    }
}