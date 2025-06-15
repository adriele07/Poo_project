from fastapi import FastAPI
from routers import user, place, booking

app = FastAPI()

app.include_router(user.router)
app.include_router(place.router)
app.include_router(booking.router)
