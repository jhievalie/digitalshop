import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Define date range
start_date = datetime(2021, 1, 1)
end_date = datetime(2025, 12, 31)

# Generate random dates and times
def random_dates(start, end, n, seed=42):
    random.seed(seed)
    return [start + timedelta(days=random.randint(0, (end - start).days)) for _ in range(n)]

def random_times(n, seed=42):
    random.seed(seed)
    return [f'{random.randint(1, 12)}:{str(random.randint(0, 59)).zfill(2)} {random.choice(['AM', 'PM'])}' for _ in range(n)]

# Product categories and details
categories = ['Kids', 'Young Adults', 'Adults']
gender = ['Boys', 'Girls', 'Men', 'Women']
products = {
    'Kids': ['Shirt', 'Pants', 'Jacket', 'Shorts', 'Dress', 'Skirt'],
    'Young Adults': ['Hoodie', 'Jeans', 'Blouse', 'Sweater', 'Cardigan', 'T-shirt'],
    'Adults': ['Coat', 'Suit', 'Dress', 'Trousers', 'Blazer', 'Polo']
}

# Generate random data for Supplies
supply_rows = 20000
supply_data = {
    'SupplyID': [f'SUP{str(i).zfill(5)}' for i in range(1, supply_rows + 1)],
    'ProductCategory': np.random.choice(categories, supply_rows),
    'Gender': np.random.choice(gender, supply_rows),
    'ProductName': [random.choice(products[cat]) for cat in np.random.choice(categories, supply_rows)],
    'QuantitySupplied': np.random.randint(50, 500, supply_rows),
    'SupplyDate': [date.strftime('%m/%d/%Y') for date in random_dates(start_date, end_date, supply_rows)],
    'SupplyTime': random_times(supply_rows)
}
supply_df = pd.DataFrame(supply_data)

# Generate Inventory based on Supplies
inventory_rows = 15000
inventory_data = {
    'InventoryID': [f'INV{str(i).zfill(5)}' for i in range(1, inventory_rows + 1)],
    'SupplyID': np.random.choice(supply_data['SupplyID'], inventory_rows),
    'QuantityAvailable': np.random.randint(10, 400, inventory_rows),
    'InventoryDate': [date.strftime('%m/%d/%Y') for date in random_dates(start_date, end_date, inventory_rows)]
}
inventory_df = pd.DataFrame(inventory_data)

# Generate Sales based on Inventory
sales_rows = 15000
sales_data = {
    'SalesID': [f'SAL{str(i).zfill(5)}' for i in range(1, sales_rows + 1)],
    'InventoryID': np.random.choice(inventory_data['InventoryID'], sales_rows),
    'QuantitySold': np.random.randint(1, 100, sales_rows),
    'SalesDate': [date.strftime('%m/%d/%Y') for date in random_dates(start_date, end_date, sales_rows)],
    'SalesTime': random_times(sales_rows),
    'Price': np.random.uniform(10, 500, sales_rows).round(2)
}
sales_df = pd.DataFrame(sales_data)

# Save all data to a single Excel file with separate sheets
output_file = 'data/AllData.xlsx'
with pd.ExcelWriter(output_file, engine='xlsxwriter') as writer:
    supply_df.to_excel(writer, sheet_name='Supplies', index=False)
    inventory_df.to_excel(writer, sheet_name='Inventory', index=False)
    sales_df.to_excel(writer, sheet_name='Sales', index=False)

'Success! Data saved in AllData.xlsx'
