from typing import Optional

class User:
    def __init__(self, id: Optional[int], name: str, email: str, password: str):
        self._id = id
        self._name = name
        self._email = email
        self._password = password

    @property
    def id(self):
        return self._id

    @property
    def name(self):
        return self._name

    @property
    def email(self):
        return self._email

    def check_password(self, password: str) -> bool:
        return self._password == password

    def __str__(self):
        return f"User({self._name}, {self._email})"
