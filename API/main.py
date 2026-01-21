from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware # Dodaj ten import
from sqlalchemy.orm import Session
from typing import List, Optional

import models
import schemas
from database import SessionLocal

app = FastAPI(title="Smart Home API")

# ----------------------------------------------------
# KONFIGURACJA CORS
# ----------------------------------------------------
origins = [
    "http://localhost:8080",  
    "http://127.0.0.1:8080",
    "http://localhost:8000",  
    "http://127.0.0.1:8000",
    "http://localhost:3000", 
    "*" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. CREATE - Dodawanie rekordu
@app.post("/dodajUrzadzenie/", response_model=schemas.Device)
def create_device(device: schemas.DeviceCreate, db: Session = Depends(get_db)):
    # --- WALIDACJA SERWEROWA ---
    if device.power_watts > 3000:
        raise HTTPException(status_code=400, detail="Moc urządzenia nie może przekraczać 3000W.")
    
    db_device = models.SmartDevice(
        name=device.name,
        power_watts=device.power_watts,
        is_active=device.is_active,
        room_id=device.room_id
    )
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

# 2. READ (All) - Odczyt listy rekordów
@app.get("/pobierzUrzadzenia/", response_model=List[schemas.Device])
def read_devices(skip: int = 0, limit: int = 100, is_active: Optional[bool] = None, db: Session = Depends(get_db)):
    query = db.query(models.SmartDevice)
    if is_active is not None:
        query = query.filter(models.SmartDevice.is_active == is_active)
    devices = query.offset(skip).limit(limit).all()
    return devices

# 2. READ (One) - Odczyt jednego rekordu
@app.get("/pobierzUrzadzenie/{device_id}", response_model=schemas.Device)
def read_device(device_id: int, db: Session = Depends(get_db)):
    device = db.query(models.SmartDevice).filter(models.SmartDevice.id == device_id).first()
    if device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    return device

# 3. UPDATE - Aktualizacja rekordu
@app.put("/aktualizujUrzadzenie/{device_id}", response_model=schemas.Device)
def update_device(device_id: int, device_update: schemas.DeviceCreate, db: Session = Depends(get_db)):
    db_device = db.query(models.SmartDevice).filter(models.SmartDevice.id == device_id).first()
    if db_device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    
    # --- WALIDACJA SERWEROWA ---
    if device_update.power_watts > 3000:
        raise HTTPException(status_code=400, detail="Moc urządzenia nie może przekraczać 3000W (Ograniczenie API).")

    db_device.name = device_update.name
    db_device.power_watts = device_update.power_watts
    db_device.is_active = device_update.is_active
    db_device.room_id = device_update.room_id
    
    db.commit()
    db.refresh(db_device)
    return db_device

# 4. DELETE - Usuwanie rekordu
@app.delete("/usunUrzadzenie/{device_id}")
def delete_device(device_id: int, db: Session = Depends(get_db)):
    db_device = db.query(models.SmartDevice).filter(models.SmartDevice.id == device_id).first()
    if db_device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    
    # --- WALIDACJA SERWEROWA (Demonstracja błędu) ---
    if db_device.is_active is False:
        raise HTTPException(status_code=400, detail="Nie można usunąć nieaktywnego urządzenia.")

    db.delete(db_device)
    db.commit()
    return {"message": "Device deleted successfully"}

# ----------------------------------------------------
# ENDPOINTY DLA POKOI (ROOMS)
# ----------------------------------------------------

@app.post("/dodajPokoj/", response_model=schemas.Room)
def create_room(room: schemas.RoomCreate, db: Session = Depends(get_db)):
    db_room = models.Room(name=room.name)
    db.add(db_room)
    db.commit()
    db.refresh(db_room)
    return db_room

@app.get("/pobierzPokoje/", response_model=List[schemas.Room])
def read_rooms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    rooms = db.query(models.Room).offset(skip).limit(limit).all()
    return rooms

@app.put("/aktualizujPokoj/{room_id}", response_model=schemas.Room)
def update_room(room_id: int, room_update: schemas.RoomCreate, db: Session = Depends(get_db)):
    db_room = db.query(models.Room).filter(models.Room.id == room_id).first()
    if db_room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    
    db_room.name = room_update.name
    db.commit()
    db.refresh(db_room)
    return db_room