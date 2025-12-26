from fastapi import FastAPI, CORS
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from pydantic import BaseModel
from backend.config import settings
from backend.services.business_service import BusinessService
from backend.utils.helpers import get_client_ip

app = FastAPI(
    title="Movie Ticket Booking Application",
    description="A modern, intuitive, and responsive movie ticket booking application",
    version="1.0.0",
)

# Initialize CORS
CORS(app)

# Initialize Business Service
business_service = BusinessService()

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Movie Ticket Booking Application"}

# Endpoint to get movie showtimes
@app.get("/showtimes")
def get_showtimes():
    showtimes = business_service.get_showtimes()
    return JSONResponse(content=showtimes, media_type="application/json")

# Endpoint to book a ticket
@app.post("/book-ticket")
def book_ticket(request: Request):
    client_ip = get_client_ip(request)
    ticket_details = business_service.book_ticket(client_ip)
    return JSONResponse(content=ticket_details, media_type="application/json")

# Error handling
@app.exception_handler(Exception)
def handle_exception(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"message": "Internal Server Error"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)