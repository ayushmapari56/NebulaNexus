from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import api.models as models
import api.schemas as schemas

router = APIRouter()

# --- Villages API ---
@router.get("/villages", response_model=List[schemas.VillageResponse])
def get_villages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Village).offset(skip).limit(limit).all()

# --- Tankers API ---
@router.get("/tankers", response_model=List[schemas.TankerResponse])
def get_tankers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Tanker).offset(skip).limit(limit).all()

@router.post("/tankers", response_model=schemas.TankerResponse)
def create_tanker(tanker: schemas.TankerBase, db: Session = Depends(get_db)):
    db_tanker = models.Tanker(**tanker.dict())
    db.add(db_tanker)
    db.commit()
    db.refresh(db_tanker)
    return db_tanker

# --- Allocations API ---
@router.get("/allocations", response_model=List[schemas.AllocationResponse])
def get_allocations(db: Session = Depends(get_db)):
    return db.query(models.Allocation).all()

@router.post("/allocations", response_model=schemas.AllocationResponse)
def create_allocation(allocation: schemas.AllocationCreate, db: Session = Depends(get_db)):
    db_allocation = models.Allocation(**allocation.dict())
    db.add(db_allocation)
    db.commit()
    db.refresh(db_allocation)
    return db_allocation

@router.post("/allocations/{allocation_id}/approve")
def approve_allocation(allocation_id: int, db: Session = Depends(get_db)):
    allocation = db.query(models.Allocation).filter(models.Allocation.id == allocation_id).first()
    if not allocation:
        raise HTTPException(status_code=404, detail="Allocation not found")
    
    allocation.status = "Approved"
    db.commit()
    
    # Mocking the push notification to the driver
    return {
        "status": "success",
        "message": f"Allocation {allocation_id} approved. Push notification sent to Driver {allocation.tanker.driver_name} via App."
    }
