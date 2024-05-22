// Basic script to handle form submissions and AJAX requests

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form[action="/api/users/login"]');
    const bookingForm = document.querySelector('form[action="/api/bookings"]');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(loginForm);
            fetch('/api/users/login', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Redirect to booking page with userId
                window.location.href = `/booking.html?userId=${data.id}`;
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(bookingForm);
            fetch('/api/bookings', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Reload the page to show updated bookings
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
        });

        // Fetch and display user bookings
        const userId = new URLSearchParams(window.location.search).get('userId');
        fetch(`/api/bookings/user/${userId}`)
            .then(response => response.json())
            .then(bookings => {
                const bookingsList = document.querySelector('ul');
                bookings.forEach(booking => {
                    const li = document.createElement('li');
                    li.textContent = `${booking.movie} - ${booking.seats} seats`;
                    bookingsList.appendChild(li);
                });
            })
            .catch(error => console.error('Error:', error));
    }
});
