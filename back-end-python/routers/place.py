from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.place import Place, Base
from schemas import PlaceCreate, PlaceOut
from typing import List

router = APIRouter(prefix="/places", tags=["places"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PlaceOut)
def create_place(place: PlaceCreate, db: Session = Depends(get_db)):
    db_place = Place(**place.dict())
    db.add(db_place)
    db.commit()
    db.refresh(db_place)
    return db_place

@router.get("/", response_model=List[PlaceOut])
def list_places(db: Session = Depends(get_db)):
    return db.query(Place).all()
