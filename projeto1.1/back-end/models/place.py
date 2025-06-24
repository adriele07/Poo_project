from typing import List, Optional

class Place:
    def __init__(self, id: Optional[int], user_id: str, title: str, address: str, photos: List[str], description: str, perks: List[str], extras: str, price: float, checkin: str, checkout: str, person: int):
        self._id = id
        self.user_id = user_id
        self.title = title
        self.address = address
        self.photos = photos
        self.description = description
        self.perks = perks
        self.extras = extras
        self.price = price
        self.checkin = checkin
        self.checkout = checkout
        self.person = person

    @property
    def id(self):
        return self._id

    def is_available(self, checkin: str, checkout: str) -> bool:
        return True

    def __str__(self):
        return f"Place({self.title}, {self.address})"
