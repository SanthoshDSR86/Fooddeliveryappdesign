from backend.models.schemas import Movie, Ticket, Showtime
from backend.config import settings

class BusinessService:
    def __init__(self):
        self.movies = []
        self.tickets = []
        self.showtimes = []

    def get_showtimes(self):
        # Simulate retrieving showtimes from database
        showtimes = [
            Showtime(id=1, movie_id=1, showtime="10:00 AM", available_seats=50),
            Showtime(id=2, movie_id=2, showtime="1:00 PM", available_seats=75),
            Showtime(id=3, movie_id=3, showtime="4:00 PM", available_seats=25),
        ]
        return [showtime.dict() for showtime in showtimes]

    def book_ticket(self, client_ip):
        # Simulate booking a ticket
        ticket = Ticket(id=1, movie_id=1, seat_number="A1", booking_date="2024-09-16")
        return ticket.dict()