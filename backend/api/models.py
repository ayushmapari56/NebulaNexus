from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Village(Base):
    __tablename__ = "villages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    wsi = Column(Float, default=0.0) # Water Stress Index
    status = Column(String, default="Low Stress")
    population = Column(Integer, default=0)
    rainfall_departure = Column(Float, default=0.0)
    
class Tanker(Base):
    __tablename__ = "tankers"

    id = Column(Integer, primary_key=True, index=True)
    license_plate = Column(String, unique=True, index=True)
    capacity_liters = Column(Integer)
    driver_name = Column(String)
    status = Column(String, default="Available") # Available, En Route, Maintenance
    current_lat = Column(Float, nullable=True)
    current_lng = Column(Float, nullable=True)

class Allocation(Base):
    __tablename__ = "allocations"

    id = Column(Integer, primary_key=True, index=True)
    village_id = Column(Integer, ForeignKey("villages.id"))
    tanker_id = Column(Integer, ForeignKey("tankers.id"))
    estimated_arrival = Column(DateTime(timezone=True))
    status = Column(String, default="Pending") # Pending, Approved, Completed
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    village = relationship("Village")
    tanker = relationship("Tanker")

class TankerRequest(Base):
    __tablename__ = "tanker_requests"

    id = Column(Integer, primary_key=True, index=True)
    authority = Column(String) # Gram Panchayat / Nagar Parishad
    location = Column(String)
    population = Column(Integer)
    liters_required = Column(Integer)
    reason = Column(String)
    contact_info = Column(String)
    priority_score = Column(Float, default=0.5)
    ai_verification = Column(String, default="genuine") # genuine, suspicious
    status = Column(String, default="Pending") # Pending, Approved, Rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())
