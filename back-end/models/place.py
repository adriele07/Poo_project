# Modelo Place não é mais necessário pois usamos JSON, mas pode-se manter funções utilitárias se desejar.
from pydantic import BaseModel
from typing import List, Optional

class Place(BaseModel):
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
