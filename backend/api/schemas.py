from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class VillageBase(BaseModel):
    name: str
    population: int
    wsi: float
    status: str
    rainfall_departure: float

class VillageCreate(VillageBase):
    pass

class VillageResponse(VillageBase):
    id: int
    class Config:
        from_attributes = True

class TankerBase(BaseModel):
    license_plate: str
    capacity_liters: int
    driver_name: str
    status: str

class TankerResponse(TankerBase):
    id: int
    current_lat: Optional[float] = None
    current_lng: Optional[float] = None

    class Config:
        from_attributes = True

class AllocationBase(BaseModel):
    village_id: int
    tanker_id: int
    estimated_arrival: datetime

class AllocationCreate(AllocationBase):
    pass

class AllocationResponse(AllocationBase):
    id: int
    status: str
    created_at: datetime
    
    village: VillageResponse
    tanker: TankerResponse

    class Config:
        from_attributes = True

class TankerRequestBase(BaseModel):
    authority: str
    location: str
    population: int
    liters_required: int
    reason: str
    contact_info: str

class TankerRequestResponse(TankerRequestBase):
    id: int
    priority_score: float
    ai_verification: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class MobileNotificationBase(BaseModel):
    title: str
    message: str

class MobileNotificationResponse(MobileNotificationBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
