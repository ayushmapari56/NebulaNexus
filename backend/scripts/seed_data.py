import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import SessionLocal, engine
from api import models
from datetime import datetime, timedelta

def init_db():
    db = SessionLocal()
    
    # Check if we already have tankers
    if db.query(models.Tanker).count() == 0:
        tankers = [
            models.Tanker(license_plate="MH-12-AB-1234", capacity_liters=10000, driver_name="Ramesh Bhai", status="Available", current_lat=18.5204, current_lng=73.8567),
            models.Tanker(license_plate="MH-14-GH-9876", capacity_liters=15000, driver_name="Suresh Kumar", status="En Route", current_lat=18.6161, current_lng=73.7981),
            models.Tanker(license_plate="MH-12-XY-5555", capacity_liters=10000, driver_name="Mukesh Singh", status="Maintenance", current_lat=18.0287, current_lng=74.0089)
        ]
        db.add_all(tankers)
        db.commit()
        print("Mock Tankers Added!")

    # Check if we already have villages (Using the frontend AI mocked ones for now if empty)
    if db.query(models.Village).count() == 0:
        villages = [
            models.Village(name="Khandala", wsi=0.85, status="Critical", population=4500, rainfall_departure=-65.0),
            models.Village(name="Bhavani Peth", wsi=0.65, status="High Stress", population=3200, rainfall_departure=-42.0),
            models.Village(name="Shirwal", wsi=0.72, status="High Stress", population=5100, rainfall_departure=-55.0)
        ]
        db.add_all(villages)
        db.commit()
        print("Mock Villages Added!")

    # Check if we already have allocations
    if db.query(models.Allocation).count() == 0:
        v1 = db.query(models.Village).filter_by(name="Khandala").first()
        t1 = db.query(models.Tanker).filter_by(status="Available").first()
        if v1 and t1:
            alloc = models.Allocation(
                village_id=v1.id, 
                tanker_id=t1.id, 
                estimated_arrival=datetime.now() + timedelta(hours=2),
                status="Pending"
            )
            db.add(alloc)
            db.commit()
            print("Mock Allocation Added!")

    db.close()

if __name__ == "__main__":
    print("Initializing Database with mock data...")
    init_db()
    print("Done!")
