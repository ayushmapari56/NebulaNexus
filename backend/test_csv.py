import pandas as pd
import os

csv_path = r"c:\Users\Ayush\OneDrive\Desktop\Drought Warning smart warning system\frontend\public\DISTRICT_RAINFALL_DISTRIBUTION_COUNTRY_INDIA_cd.csv"

def test_load():
    if not os.path.exists(csv_path):
        print(f"Path does not exist: {csv_path}")
        return

    try:
        df = pd.read_csv(csv_path, skiprows=3)
        print(f"Columns: {df.columns.tolist()}")
        print(f"First 2 rows:\n{df.head(2)}")
        
        extracted_data = []
        for i, row in df.iterrows():
            try:
                # Column 1 should be district name
                district_name = str(row.iloc[1]).strip()
                # Column 9 should be departure
                dep_str = str(row.iloc[9]).replace('%', '').strip()
                
                if district_name and district_name != 'nan':
                    print(f"District: {district_name}, Dep: {dep_str}")
                    extracted_data.append(district_name)
                
                if len(extracted_data) >= 5:
                    break
            except Exception as e:
                print(f"Error at row {i}: {e}")
                
    except Exception as e:
        print(f"Failed to read: {e}")

if __name__ == "__main__":
    test_load()
