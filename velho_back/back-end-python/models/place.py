from sqlalchemy import Column, Integer, String, ForeignKey, Float

from models import Base

class Place(Base):
    __tablename__ = 'places'
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String, nullable=False)
    address = Column(String, nullable=False)
    photos = Column(String)  # Armazene como JSON ou string separada por vírgula
    description = Column(String)
    perks = Column(String)  # Armazene como JSON ou string separada por vírgula
    extra_info = Column(String)
    check_in = Column(String)
    check_out = Column(String)
    max_guests = Column(Integer)
    price = Column(Float)
