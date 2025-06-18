from pydantic import BaseModel
from typing import Optional

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
    title: str
    address: str
    photos: Optional[str]
    description: Optional[str]
    perks: Optional[str]
    extra_info: Optional[str]
    check_in: Optional[str]
    check_out: Optional[str]
    max_guests: Optional[int]
    price: Optional[float]

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
