from pydantic import BaseModel

class DeviceBase(BaseModel):
    name: str
    power_watts: int
    is_active: bool

class DeviceCreate(DeviceBase):
    pass


class Device(DeviceBase):
    id: int

    class Config:
        from_attributes = True