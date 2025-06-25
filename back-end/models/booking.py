from typing import Optional

class Booking:
    def __init__(self, id: Optional[int], user_id: int, place_id: int, check_in: str, check_out: str, price: float, guests: int):
        self._id = id
        self.user_id = user_id
        self.place_id = place_id
        self.check_in = check_in
        self.check_out = check_out
        self.price = price
        self.guests = guests

    @property
    def id(self):
        return self._id

    def total_price(self):
        return self.price * self.guests

    def __str__(self):
        return f"Booking({self.user_id}, {self.place_id}, {self.check_in}, {self.check_out})"

    @staticmethod
    def from_dict(data: dict) -> 'Booking':
        return Booking(
            id=data.get('id'),
            user_id=data['user_id'],
            place_id=data['place_id'],
            check_in=data['check_in'],
            check_out=data['check_out'],
            price=data['price'],
            guests=data['guests']
        )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "user_id": self.user_id,
            "place_id": self.place_id,
            "check_in": self.check_in,
            "check_out": self.check_out,
            "price": self.price,
            "guests": self.guests
        }

    def is_valid(self) -> bool:
        return self.price > 0 and self.guests > 0
