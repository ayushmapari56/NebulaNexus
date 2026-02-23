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
