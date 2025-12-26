from pydantic import BaseModel

class Movie(BaseModel):
    id: int
    title: str
    genre: str
    showtime: str

class Ticket(BaseModel):
    id: int
    movie_id: int
    seat_number: str
    booking_date: str

class Showtime(BaseModel):
    id: int
    movie_id: int
    showtime: str
    available_seats: int