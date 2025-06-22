from sqlalchemy import Column, Integer, Date, Float, ForeignKey

from models import Base

class Booking(Base):
    __tablename__ = 'bookings'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    place_id = Column(Integer, ForeignKey('places.id'), nullable=False)
    check_in = Column(Date)
    check_out = Column(Date)
    price = Column(Float)
    guests = Column(Integer)
