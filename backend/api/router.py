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

# --- Local Body Requests ---
@router.get("/requests", response_model=List[schemas.TankerRequestResponse])
def get_requests(db: Session = Depends(get_db)):
    return db.query(models.TankerRequest).all()

@router.post("/requests", response_model=schemas.TankerRequestResponse)
def submit_tanker_request(req: schemas.TankerRequestBase, db: Session = Depends(get_db)):
    # AI Logic: Auto-calculate priority and audit
    priority = 0.5
    audit = "genuine"
    
    # Suspicious if population is low but liters are high (Anti-Fraud)
    if req.liters_required > (req.population * 200): # >200L per person is suspicious for drought aid
        audit = "suspicious"
        priority = 0.9 # High priority for audit
    
    db_req = models.TankerRequest(
        **req.dict(),
        priority_score=priority,
        ai_verification=audit,
        status="Pending"
    )
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    
    print(f"AI ENGINE: New Persistent Request from {req.authority} at {req.location}")
    return db_req

@router.post("/requests/{request_id}/action")
def update_request_status(request_id: int, status: str, db: Session = Depends(get_db)):
    db_req = db.query(models.TankerRequest).filter(models.TankerRequest.id == request_id).first()
    if not db_req:
        raise HTTPException(status_code=404, detail="Request not found")
    
    db_req.status = status
    db.commit()
    return {"status": "success", "request_id": request_id, "new_status": status}
