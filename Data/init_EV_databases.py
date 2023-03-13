#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import sqlite3 as sql


# In[180]:


## read in excel sheets
zip_to_grid = pd.read_excel('/Users/josheverts/Downloads/Zip_to_Grid.xlsx')
epa_df = pd.read_xml("/Users/josheverts/Downloads/vehicles.xml")
epa_test_data = pd.read_csv('/Users/josheverts/Downloads/light-duty-vehicle-test-results-report-2014-present.csv', header = 1)
test_data_2023 = pd.read_excel('/Users/josheverts/Downloads/23-testcar-2022-11-03.xlsx')


# In[6]:


xls = pd.ExcelFile('/Users/josheverts/Downloads/GREET_2022/GREET2_2022.xlsm')
df1 = pd.read_excel(xls, 'Mat_Sum')
df2 = pd.read_excel(xls, 'Battery_Sum')
df3 = pd.read_excel(xls, 'Vehi_Comp_Sum')


# In[47]:


## clean material sum file and extract materials;
## assign each material an adjusted row index 
df1_subset = df1.iloc[24:]
column_names = df1_subset.iloc[0]
column_names[0] = 'Emissions Type'
df1_subset.columns = column_names
df1_emissions_subset = df1_subset.iloc[32-24:46-24] ## adjust to new index
df1_emissions_subset = df1_emissions_subset.drop([32])


# In[49]:


df1_emissions_subset.head()


# In[95]:


## clean battery percentages file
df2_subset_NiMh = df2.iloc[48:90]
columns = df2_subset.iloc[0]
columns[0] = 'Material'
## create two separate tables for NiMh and Li-ion batteries
## NiMh battery
df2_subset_NIMH = df2_subset.iloc[57-48:67-48]
df2_subset_NIMH.columns = columns
df2_subset_NIMH = df2_subset_NIMH.drop(df2_subset_NIMH.columns[[1,2]], axis = 1)
df2_subset_NIMH = df2_subset_NIMH.drop(df2_subset_NIMH.columns[9:], axis = 1)
## LiIon battery
df2_subset_LI = df2_subset.iloc[68-48:89-48]
df2_subset_LI.columns = columns
df2_subset_LI = df2_subset_LI.drop(df2_subset_LI.columns[[1,2]], axis = 1)
df2_subset_LI = df2_subset_LI.drop(df2_subset_LI.columns[9:], axis = 1)


# In[115]:


## clean vehicle composition percentages file
df3_subset = df3.iloc[135:174]
columns = df2_subset.iloc[0]
columns[0] = 'Material'
df3_subset.columns = columns
df3_subset = df3_subset.drop(df3_subset.columns[11:], axis = 1)


# In[117]:


df3_subset


# In[181]:


## clean and index epa curb weight data
epa_test_data_grouped = epa_test_data[epa_test_data['Model Year'] == 2023]
epa_test_data_grouped = epa_test_data_grouped.groupby(['Represented Test Vehicle Make', 'Represented Test Vehicle Model'], group_keys = False)
epa_curb_weights = epa_test_data_grouped.mean()
epa_curb_weights = epa_curb_weights.reset_index() ## flatten
epa_curb_weights = epa_curb_weights.reset_index() ## create unique id
epa_curb_weights = epa_curb_weights.rename(columns = {'index':'VehicleID'})

## clean and index epa adj weight data
test_data_2023 = test_data_2023[test_data_2023['Model Year'] == 2023]
test_data_2023_grouped = test_data_2023.groupby(['Represented Test Veh Make', 'Represented Test Veh Model', 'Veh Mfr Code'], group_keys = False).mean()
test_data_2023_grouped = test_data_2023_grouped.reset_index()
test_data_2023_grouped = test_data_2023_grouped.reset_index()
test_data_2023_grouped = test_data_2023_grouped.rename(columns = {'index':'VehicleID'})


# select 2023 years from epa range/efficiency data
epa_df = epa_df[epa_df['year'] == 2023]

## rename columns of each df
rename_dict = {'id': 'VehicleID', 'make': 'Make', 'model':'Model', 'mfrCode':'MFRCode', 'range': 'Range',
              'rangeHwy': 'RangeHwy', 'year':'Year'}
epa_df = epa_df.rename(rename_dict, axis=1)  
rename_dict = {'Model Year': 'Year', 'Represented Test Vehicle Model':'Model', 
               'Represented Test Vehicle Make': 'Make', 'Curb Weight (lbs.)':'CurbWeight'}
epa_curb_weights = epa_curb_weights.rename(rename_dict, axis=1)  
rename_dict = {'Model Year': 'Year', 'Represented Test Veh Make':'Make', 'Veh Mfr Code': 'MFRCode',
               'Represented Test Veh Model':'Model', 'Equivalent Test Weight (lbs.)':'AdjWeight'}
epa_adj_weights = test_data_2023_grouped.rename(rename_dict, axis=1)  

## take selected columns from each df
epa_df = epa_df[['VehicleID', 'Year', 'MFRCode', 'Make', 'Model', 'Range', 'RangeHwy', 'UHighway', 'UCity']]
epa_curb_weights = epa_curb_weights[['VehicleID', 'Year', 'Make', 'Model', 'CurbWeight']]
epa_adj_weights = epa_adj_weights[['VehicleID', 'Year', 'MFRCode', 'Make', 'Model', 'AdjWeight']]

## convert years back to int
epa_curb_weights.astype({'Year': 'int32'})
epa_adj_weights.astype({'Year': 'int32'})


# In[ ]:


## clean and index epa adj weight data
test_data_2023 = test_data_2023[test_data_2023['Model Year'] == 2023]
test_data_2023_grouped = test_data_2023.groupby(['Represented Test Veh Make', 'Represented Test Veh Model'], group_keys = False).mean()
test_data_2023_grouped = test_data_2023_grouped.reset_index()
test_data_2023_grouped = test_data_2023_grouped.rename(columns = {'index':'VehicleID'})


# In[195]:


epa_df['VehicleID'].is_unique


# In[183]:


epa_curb_weights.head()


# In[184]:


epa_adj_weights.head()


# In[185]:


# ## clean zip data (drop unused columns)
# if len(zip_to_grid.columns) > 6:
#     zip_to_grid = zip_to_grid.drop(zip_to_grid.columns[[0,6,7]], axis = 1)
# ## clean epa data (drop unused columns)
# epa_df = epa_df[['id', 'make', 'model', 'mfrCode', 'range', 'rangeHwy', 'UHighway', 'UCity', 'year']]
# ## epa_df from 2023 
# epa_df = epa_df[epa_df['year'] == 2023]
# ## rename columns 
# rename_dict = {'id': 'VehicleID', 'make': 'Make', 'model':'Model', 'mfrCode':'MFRCode', 'range': 'Range',
#               'rangeHwy': 'RangeHwy', 'year':'Year'}
# epa_df = epa_df.rename(rename_dict, axis=1)  
# ## clean epa test data
# epa_test_data = epa_test_data[['Vehicle ID', 'Model Year', 'Represented Test Vehicle Make', 'Represented Test Vehicle Model', 'Curb Weight (lbs.)']]
# epa_test_data = epa_test_data[epa_test_data['Model Year'] == 2023]
# ## rename columns
# rename_dict = {'Model Year': 'Year', 'Represented Test Vehicle Model':'Model', 
#                'Represented Test Vehicle Make': 'Make', 'Curb Weight (lbs.)':'CurbWeight'}
# epa_test_data = epa_test_data.rename(rename_dict, axis=1)  
# ##
# epa_weight_data = test_data_2023[['Test Vehicle ID', 'Model Year', 'Veh Mfr Code', 'Represented Test Veh Make', 'Represented Test Veh Model', 'Equivalent Test Weight (lbs.)']]
# epa_weight_data = epa_weight_data[epa_weight_data['Model Year'] == 2023]
# ## rename weight data
# rename_dict = {'Test Vehicle ID': 'VehicleID', 'Model Year': 'Year', 'Represented Test Veh Make':'Make', 
#                'Represented Test Veh Model':'Model', 'Veh Mfr Code':'MFRCode', 'Equivalent Test Weight (lbs.)':'AdjWeight'}
# epa_weight_data = epa_weight_data.rename(rename_dict, axis=1)  


# In[196]:


# zip_to_grid.head()
## convert to sqlite db
db_conn = sql.connect("/Users/josheverts/EV_data/EV_data.db")


# In[197]:


epa_df.VehicleID.is_unique


# In[198]:


c = db_conn.cursor()


# In[255]:


## range 
c.execute("""DROP TABLE IF EXISTS EPA_range_data;""")
c.execute(
    """
    CREATE TABLE IF NOT EXISTS EPA_range_data(
        VehicleID INTEGER,
        Year REAL,
        MFRCode TEXT NOT NULL,
        Make TEXT NOT NULL COLLATE NOCASE ,
        Model TEXT NOT NULL COLLATE NOCASE,
        Range REAL,
        RangeHwy REAL,
        UHighway REAL,
        UCity REAL,
        
        PRIMARY KEY(VehicleID),
        FOREIGN KEY(Make) REFERENCES EPA_curb_weight_data(Make),
        FOREIGN KEY(Model) REFERENCES EPA_curb_weight_data(Model),
        FOREIGN KEY(Make) REFERENCES EPA_adj_weight_data(Make),
        FOREIGN KEY(Model) REFERENCES EPA_adj_weight_data(Model),
        FOREIGN KEY(MFRCode) REFERENCES EPA_adj_weight_data(MFRCode)
        );
     """
)

# curb weight
c.execute("""DROP TABLE IF EXISTS EPA_curb_weight_data""")
c.execute(
    """
    CREATE TABLE IF NOT EXISTS EPA_curb_weight_data (
        VehicleID INTEGER,
        Year REAL,
        Make TEXT NOT NULL COLLATE NOCASE ,
        Model TEXT NOT NULL COLLATE NOCASE,
        CurbWeight Real,
        PRIMARY KEY(VehicleID)
        );
     """
)

# adj weight
c.execute("""DROP TABLE IF EXISTS EPA_adj_weight_data;""")
c.execute(
    """
    CREATE TABLE IF NOT EXISTS EPA_adj_weight_data (
        VehicleID INTEGER,
        Year REAL,
        MFRCode TEXT NOT NULL,
        Make TEXT NOT NULL COLLATE NOCASE ,
        Model TEXT NOT NULL COLLATE NOCASE,
        AdjWeight Real,
        PRIMARY KEY(VehicleID)
        );
    """
)


# In[256]:


#zip_to_grid.to_sql('zip2grid', db_conn, if_exists='append', index=False)
epa_df.to_sql('EPA_range_data', db_conn, if_exists='append', index=False)
epa_curb_weights.to_sql('EPA_curb_weight_data', db_conn, if_exists='append', index=False)
epa_adj_weights.to_sql('EPA_adj_weight_data', db_conn, if_exists='append', index=False)
#zip_to_grid.to_sql('zip2grid', db_conn, if_exists='append', index=False)
#zip_to_grid.to_sql('zip2grid', db_conn, if_exists='append', index=False)


# In[257]:


pd.read_sql("SELECT * FROM EPA_adj_weight_data LIMIT 5", db_conn)


# In[258]:


## some test joins
query = '''SELECT DISTINCT *
         FROM EPA_range_data 
         INNER JOIN EPA_adj_weight_data
         ON EPA_range_data.Make = EPA_adj_weight_data.Make AND 
         EPA_range_data.Model = EPA_adj_weight_data.Model'''

c.execute(query)
# Fetching rows from the result table
result = c.fetchall()
for row in result:
    print(row)


# In[82]:


## zip2grid database
zip_to_grid = pd.read_excel('/Users/josheverts/Downloads/Zip_to_Grid.xlsx')
## rename columns 
rename_dict = {'ZIP (numeric)': 'ZIP', 'state': 'State', 'eGRID Subregion #1': 'Subregion1', 'eGRID Subregion #2': 'Subregion2',
              'eGRID Subregion #3': 'Subregion3',}
zip_to_grid = zip_to_grid.rename(rename_dict, axis=1)  
zip_to_grid = zip_to_grid[['ZIP', 'State', 'Subregion1', 'Subregion2', 'Subregion3']]
len(zip_to_grid)


# In[83]:


zip_to_grid = zip_to_grid.drop_duplicates(['ZIP'])


# In[84]:


len(zip_to_grid)


# In[24]:


## subregion emissions database
subregion_emissions = pd.read_excel('/Users/josheverts/Downloads/power_profiler_zipcode_tool.xlsx', 
                                    sheet_name = 'eGRID Subregion Emission Factor', header = 2)
## drop first row (set of codes)
subregion_emissions = subregion_emissions.drop(index = 0)
rename_dict = {'eGRID subregion name ': 'RegionName', 'eGRID subregion acronym': 'RegionCode',
               'eGRID subregion annual CO2 total output emission rate (lb/MWh)': 'Co2Rate'}
subregion_emissions = subregion_emissions.rename(rename_dict, axis=1)  
subregion_emissions = subregion_emissions[['RegionName', 'RegionCode', 'Co2Rate']]


# In[56]:


## create gridmix database 
db_conn = sql.connect("/Users/josheverts/EV_data/gridmix.db")
c = db_conn.cursor()


# In[57]:


c.execute("""DROP TABLE IF EXISTS Zip2Grid;""")

c.execute(
    """
    CREATE TABLE IF NOT EXISTS Zip2Grid (
        ZIP INTEGER,
        State TEXT NOT NULL,
        Subregion1 TEXT NOT NULL,
        Subregion2 TEXT,
        Subregion3 TEXT,
        Co2Rate REAL,
        
        PRIMARY KEY(ZIP),
        FOREIGN KEY(Subregion1) REFERENCES Subregion(RegionCode),
        FOREIGN KEY(Subregion2) REFERENCES Subregion(RegionCode),
        FOREIGN KEY(Subregion3) REFERENCES Subregion(RegionCode)
        );
     """
)
# curb weight
c.execute("""DROP TABLE IF EXISTS Subregion;""")
c.execute(
    """
    CREATE TABLE IF NOT EXISTS Subregion (
        RegionName TEXT NOT NULL,
        RegionCode TEXT NOT NULL,
        Co2Rate REAL,
        PRIMARY KEY(RegionCode)
        );
     """
)


# In[85]:


zip_to_grid.to_sql('Zip2Grid', db_conn, if_exists='append', index=False)


# In[86]:


subregion_emissions.to_sql('Subregion', db_conn, if_exists='append', index=False)


# In[ ]:




