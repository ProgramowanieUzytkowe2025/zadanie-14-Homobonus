from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    
    devices = relationship("SmartDevice", back_populates="room")

class SmartDevice(Base):
    __tablename__ = "smart_devices"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)      # Pole tekstowe
    power_watts = Column(Integer)          # Pole liczbowe
    is_active = Column(Boolean, default=False) # Pole boolowskie
    room_id = Column(Integer, ForeignKey("rooms.id"), nullable=True) # Klucz obcy

    room = relationship("Room", back_populates="devices")