from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    class Config:
        orm_mode = True

class PlaceCreate(BaseModel):
    id: Optional[int] = None
    user_id: str
    title: str
    address: str
    photos: List[str]
    description: str
    perks: List[str]
    extras: str
    price: float
    checkin: str
    checkout: str
    person: int

class PlaceOut(BaseModel):
    id: int
    title: str
    address: str
    class Config:
        orm_mode = True

class BookingCreate(BaseModel):
    user_id: int
    place_id: int
    check_in: str
    check_out: str
    price: float
    guests: int

class BookingOut(BaseModel):
    id: int
    user_id: int
    place_id: int
    class Config:
        orm_mode = True
