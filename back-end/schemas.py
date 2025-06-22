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

class PlaceUpdate(BaseModel):
    title: Optional[str] = None
    address: Optional[str] = None
    photos: Optional[List[str]] = None
    deleted_photos: Optional[List[str]] = [] 
    description: Optional[str] = None
    perks: Optional[List[str]] = None
    extras: Optional[str] = None
    price: Optional[float] = None
    checkin: Optional[str] = None
    checkout: Optional[str] = None
    person: Optional[int] = None


class PlaceOut(BaseModel):
    id: int
    title: str
    address: str
    photos: List[str] = []
    description: str = ""
    perks: List[str] = []
    extras: str = ""
    price: float = 0
    checkin: str = ""
    checkout: str = ""
    person: int = 1
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
