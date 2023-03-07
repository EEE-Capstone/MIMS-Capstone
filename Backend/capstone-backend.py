#!/usr/bin/env python
# coding: utf-8

# In[2]:


import numpy as np
import pandas as pd
import matplotlib.pyplot as plt


# In[5]:


a = np.array([.1,.2,.4,.3])
a = a*5
b = np.array([1,2,3,4])
a*b


# In[13]:


## define functions to import as a file
## Vehicle is planned object which will be one entry taken from EPA vehicle testing database
## User is planned object which will store a user's input
def est_battery_capacity_from_vehicle(Vehicle):
    kwh_size = Vehicle.range*(1/Vehicle.FE)*33.7
    return kwh_size


## vehicle data (here we assume constant for all vehicle types to be changed later)
non_battery_mass_fractions = [.599, .153, .082, .046, .039, .024, .019, .009, 0]
remainder_non_battery = 1-sum(non_battery_mass_fractions)
non_battery_mass_fractions = non_battery_mass_fractions + [remainder_non_battery]
non_battery_emissions_vector = [1037, 1358, 1644, 732, 1782, 360, 1949, 5163, 1734]

## vehicle material transformation (includes assembly, disposal, recycling)
## for now assume constant (not depending on vehicle type or weight)
vehicle_mat_transform = 1.5e6 ## grams/lifetime 

## vehicle battery manufacture (includes both lead acid and li-ion batteries)
## assume constant li-ion term across vehicle types: 60,000 g (3 battery replacements)
## assume Co2 emissions in grams are roughly 4e3 times battery weight (highly simplified model for now)



def weighted_emissions_calc(vehicle_weight, mass_fractions, emissions_vector):
    mass_fractions = np.array(mass_fractions)
    emissions_vector = np.array(emissions_vector)
    return vehicle_weight*mass_fractions*emissions_vector



def get_embodied_emissions(vehicle_weight, battery_weight):
    
    ## vehicle assembly and materials calculation
    ## from GREET 2022: 
    ## components: 
    comp_sum = weighted_emissions_calc(vehicle_weight, non_battery_mass_fractions, non_battery_emissions_vector)
    mass_varying = 4e3*battery_weight ## highly simplified model for now (based on GREET data)
    vehicle_battery = 60000 + mass_varying
    fluids = 634,200 ## assume constant for now, should be less for an EV
    
    return comp_sum + mass_varying + vehicle_battery + fluids

def est_embodied_emissions(Vehicle):
    ## account for EV battery or ICE
    if Vehicle.battery == True:
        battery = True
        kwh_size = est_battery_capacity_from_vehicle(Vehicle)
    else:
        battery = False
        kwh_size = 0
    vehicle_weight = Vehicle.weight
    ## send estimated battery capacity and vehicle weight to embodied emissions function
    embodied_emissions = get_embodied_emissions(vehicle_weight, battery_weight)  
    return embodied_emissions

def get_grid_carbon(User):
    ## store lookup table of CO2 intensity by grid region
    ## convert User zipcode input to grid region
    
    region = get_user_region(User)
    Lookup_dict = {'': 1, '': 2}
    return Lookup_dict[region]
    

def est_usage_emissions(Vehicle, User):
    total_miles_est = User.miles_per_year*User.ownership_period
    if Vehicle.battery == False:
        return Vehicle.mpg*total_miles_est*8.9 ## 8.9 kgC02 per gallon
    elif Vehicle.battery == True:
        grid_carbon = get_grid_carbon(User) ## per kwH
        return Vehicle.mpg*total_miles_est*grid_carbon*33.7 ## carbon per kwh*kwh/gallon
    else:
        return

def est_lifetime_emissions(Vehicle, User):
    ## account for EV battery or ICE
    embodied_emissions = est_embodied_emisions(Vehicle)
    usage_emissions = est_usage_emissions(Vehicle,User)
    return embodied_emissions+usage_emissions
    
        
    


# In[15]:


import pandas as pd
import sqlite3 as sql
db_conn = sql.connect("/Users/josheverts/MIMS-Capstone/Data/zip2grid.db")


# In[16]:


c = db_conn.cursor()


# In[23]:


pd.read_sql("SELECT * FROM pragma_table_info('zip2grid') c", db_conn)


# In[34]:


get_ipython().run_line_magic('pip', 'update sqlite3')


# In[30]:


c.execute(
    '''
    ALTER TABLE zip2grid;
    RENAME COLUMN ZIP (numeric) TO ZIP;
    '''
)


# In[ ]:




