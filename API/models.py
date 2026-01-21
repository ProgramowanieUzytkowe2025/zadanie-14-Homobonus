from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class SmartDevice(Base):
    __tablename__ = "smart_devices"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)      # Pole tekstowe
    power_watts = Column(Integer)          # Pole liczbowe
    is_active = Column(Boolean, default=False) # Pole boolowskie