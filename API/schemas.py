from pydantic import BaseModel
from typing import List, Optional

class DeviceBase(BaseModel):
    name: str
    power_watts: int
    is_active: bool
    room_id: Optional[int] = None

class DeviceCreate(DeviceBase):
    pass

class Device(DeviceBase):
    id: int

    class Config:
        from_attributes = True

class RoomBase(BaseModel):
    name: str

class RoomCreate(RoomBase):
    pass

class Room(RoomBase):
    id: int
    devices: List[Device] = []

    class Config:
        from_attributes = True