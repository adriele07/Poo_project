from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.booking import Booking, Base
from schemas import BookingCreate, BookingOut
from typing import List

router = APIRouter(prefix="/bookings", tags=["bookings"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=BookingOut)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    db_booking = Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[BookingOut])
def list_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).all()
