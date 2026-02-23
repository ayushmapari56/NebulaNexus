import pandas as pd
import os
import math

class DataProcessor:
    def __init__(self):
        # We know the CSV is in the frontend public folder 
        self.csv_path = os.path.join(
            os.path.dirname(__file__), 
            '..', '..', 'frontend', 'public', 
            'DISTRICT_RAINFALL_DISTRIBUTION_COUNTRY_INDIA_cd.csv'
        )

    def load_rainfall_data(self):
        """
        Loads and cleans the district rainfall dataset.
        Extracts the important columns: District Name, and % Departure from Normal.
        """
        if not os.path.exists(self.csv_path):
            return []

        try:
            # The CSV has multiple header rows and complex formatting, we need to skip the first 3 lines
            df = pd.read_csv(self.csv_path, skiprows=3)
            
            # The columns based on standard IMD reports usually have names in the 3rd row, 
            # let's map them by index for safety since headers are dirty.
            # Index 1 = STATE/DISTRICT (NAME), Index 4 = % DEP (Day), Index 8 = % DEP (Period)
            
            extracted_data = []
            
            for _, row in df.iterrows():
                try:
                    district_name = str(row.iloc[1]).strip()
                    if pd.isna(row.iloc[1]) or district_name == 'nan' or 'DISTRICT' in district_name or 'NORMAL' in district_name:
                        continue
                        
                    # Extract the period departure percentage (converting strings like '-95%' to float)
                    dep_str = str(row.iloc[8]).replace('%', '').strip()
                    if dep_str and dep_str != 'nan':
                        departure = float(dep_str)
                    else:
                        departure = 0.0
                        
                    # Calculate a mock WSI (Water Stress Index) based on the rainfall departure
                    # Formula logic: High negative departure = High Stress (Closer to 1.0)
                    # If departure is -50%, then deficit is 50. We scale it so -100% departure represents high stress factor.
                    
                    deficit_factor = 0
                    if departure < 0:
                        deficit_factor = min(abs(departure) / 100.0, 1.0)
                        
                    # In a real model, this would be: WSI = 0.35(Rainfall Deficit) + 0.30(Groundwater) + (Population) etc.
                    # For SIH demo, we will use the actual rainfall deficit as the primary driver.
                    base_wsi = 0.3 + (deficit_factor * 0.6) # Scale it reasonably for UI
                    
                    # Add some mock population and groundwater data to make the json rich
                    extracted_data.append({
                        "id": len(extracted_data) + 1,
                        "district": district_name,
                        "rainfall_departure": departure,
                        "wsi": round(base_wsi, 2),
                        "status": self._get_status(base_wsi),
                        "population": 5000 + abs(int(departure * 100)), # Mock population variation
                    })
                except Exception as e:
                    continue

            # Return top 20 most critical for the dashboard maps
            critical_districts = sorted(extracted_data, key=lambda x: x['wsi'], reverse=True)
            return critical_districts[:20]

        except Exception as e:
            print(f"Error processing CSV: {str(e)}")
            return []
            
    def _get_status(self, wsi):
        if wsi >= 0.8: return "Critical"
        if wsi >= 0.6: return "High Stress"
        if wsi >= 0.4: return "Moderate"
        return "Low Stress"

processor = DataProcessor()
