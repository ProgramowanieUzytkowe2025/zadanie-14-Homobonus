from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware # Dodaj ten import
from sqlalchemy.orm import Session
from typing import List

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
    "http://localhost:3000",  # Typowy port React/Vue
    "*" # Opcjonalnie: zezwolenie na WSZYSTKIE źródła (tylko na etapie deweloperskim!)
]

# 2. Dodaj middleware CORS do aplikacji
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Zezwolenie na wszystkie metody (GET, POST, PUT, DELETE, itd.)
    allow_headers=["*"], # Zezwolenie na wszystkie nagłówki (Content-Type, Authorization, itd.)
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
    db_device = models.SmartDevice(
        name=device.name,
        power_watts=device.power_watts,
        is_active=device.is_active
    )
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

# 2. READ (All) - Odczyt listy rekordów
@app.get("/pobierzUrzadzenia/", response_model=List[schemas.Device])
def read_devices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    devices = db.query(models.SmartDevice).offset(skip).limit(limit).all()
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
    
    db_device.name = device_update.name
    db_device.power_watts = device_update.power_watts
    db_device.is_active = device_update.is_active
    
    db.commit()
    db.refresh(db_device)
    return db_device

# 4. DELETE - Usuwanie rekordu
@app.delete("/usunUrzadzenie/{device_id}")
def delete_device(device_id: int, db: Session = Depends(get_db)):
    db_device = db.query(models.SmartDevice).filter(models.SmartDevice.id == device_id).first()
    if db_device is None:
        raise HTTPException(status_code=404, detail="Device not found")
    
    db.delete(db_device)
    db.commit()
    return {"message": "Device deleted successfully"}