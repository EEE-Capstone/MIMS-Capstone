#!/usr/bin/env python
# coding: utf-8

# In[24]:


import pandas as pd
import sqlite3 as sql


# In[18]:


## read in excel sheets
zip_to_grid = pd.read_excel('/Users/josheverts/Downloads/Zip_to_Grid.xlsx')
epa_df = pd.read_xml("/Users/josheverts/Downloads/vehicles.xml")
epa_test_data = pd.read_csv('/Users/josheverts/Downloads/light-duty-vehicle-test-results-report-2014-present.csv', header = 1)
test_data_2023 = pd.read_excel('/Users/josheverts/Downloads/23-testcar-2022-11-03.xlsx')


# In[20]:


test_data_2023.columns


# In[22]:


## clean zip data (drop unused columns)
if len(zip_to_grid.columns) > 6:
    zip_to_grid = zip_to_grid.drop(zip_to_grid.columns[[0,6,7]], axis = 1)
## clean epa data (drop unused columns)
epa_df = epa_df[['id', 'make', 'model', 'mfrCode', 'range', 'rangeHwy', 'UHighway', 'UCity', 'year']]
## epa_df from 2023 
epa_df = epa_df[epa_df['year'] == 2023]
## clean epa test data
epa_test_data = epa_test_data[['Vehicle ID', 'Model Year', 'Represented Test Vehicle Make', 'Represented Test Vehicle Model', 'Curb Weight (lbs.)']]
epa_test_data = epa_test_data[epa_test_data['Model Year'] == 2023]
##
epa_weight_data = test_data_2023[['Test Vehicle ID', 'Model Year', 'Veh Mfr Code', 'Represented Test Veh Make', 'Represented Test Veh Model', 'Equivalent Test Weight (lbs.)']]
epa_weight_data = epa_weight_data[epa_weight_data['Model Year'] == 2023]


# In[30]:


# zip_to_grid.head()
## convert to sqlite db
db_conn = sql.connect("/Users/josheverts/EV_data/EV_data.db")


# In[31]:


c = db_conn.cursor()


# In[34]:


c.execute(
    """
    CREATE TABLE IF NOT EXISTS EPA_range_data(
        VehicleID INTEGER ,
        Make TEXT NOT NULL,
        Model TEXT NOT NULL,
        MFRCode TEXT NOT NULL,
        Range REAL,
        RangeHwy REAL,
        UHighway REAL,
        UCity REAL,
        Year REAL,
        
        PRIMARY KEY(VehicleID),
        FOREIGN KEY(Make) REFERENCES EPA_curb_weight_data(Make),
        FOREIGN KEY(Model) REFERENCES EPA_curb_weight_data(Model),
        FOREIGN KEY(Make) REFERENCES EPA_adj_weight_data(Make),
        FOREIGN KEY(Model) REFERENCES EPA_adj_weight_data(Model),
        FOREIGN KEY(MFRCode) REFERENCES EPA_adj_weight_data(MFRCode)
        );
     """
)

# ORDERS
c.execute(
    """
    CREATE TABLE IF NOT EXISTS EPA_curb_weight_data (
        VehicleID INTEGER,
        Year REAL,
        Model TEXT NOT NULL,
        Make TEXT NOT NULL,
        CurbWeight Real,
        PRIMARY KEY(VehicleID)
        );
     """
)

# CUSTOMERS
c.execute(
    """
    CREATE TABLE IF NOT EXISTS EPA_adj_weight_data (
        VehicleID INTEGER,
        Year REAL,
        MFRCode TEXT NOT NULL,
        Make TEXT NOT NULL,
        Model TEXT NOT NULL,
        AdjWeight Real,
        PRIMARY KEY(VehicleID)
        );
    """
)


# In[35]:


#zip_to_grid.to_sql('zip2grid', db_conn, if_exists='append', index=False)
epa_df.to_sql('EPA_range_data', db_conn, if_exists='append', index=False)
epa_test_data.to_sql('EPA_curb_weight_data', db_conn, if_exists='append', index=False)
epa_weight_data.to_sql('EPA_adj_weight_data', db_conn, if_exists='append', index=False)
#zip_to_grid.to_sql('zip2grid', db_conn, if_exists='append', index=False)
#zip_to_grid.to_sql('zip2grid', db_conn, if_exists='append', index=False)


# In[28]:


pd.read_sql("SELECT * FROM zip2grid LIMIT 5", db_conn)

