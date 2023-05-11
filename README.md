
# The Hidden Emissions of Electric Vehicles 
### 2023 MIMS Capstone Project by Astoria Ho, Clara Hu, Josh Everts

Our project, **The Hidden Emissions of Electric Vehicles**, examines the sustainability of zero emissions vehicles and highlights barriers to EV adoption and use in California. Through an interactive website and vehicle emissions tool, called Emissions Explorer, we break down how and why EVs still emit, and let people explore how different factors – charging location, vehicle type, and mileage – all impact emissions. 

Our Emissions Explorer allows a user to input almost any vehicle (gas, hybrid, or electric) and outputs the lifetime emissions of that vehicle, along with useful context about how that vehicle compares to its peers. We built our emissions model calculations using data from the GREET model, created by Argonne National Laboratory (ANL), and vehicle emissions and weight data from the EPA. Emissions Explorer models the production, use, and end-of-life emissions for a vehicle, and is the first tool to integrate these calculations into a digestible, consumer-facing product. 

The **Hidden Emissions of Electric Vehicles and Emissions Explorer**, were ideated, designed, and built by three students from the School of Information at UC Berkeley as a capstone project for the Master of Information Management and Systems program. 

- [Visit our project website](https://eee-capstone.github.io/MIMS-Capstone/templates/index.html#) 
- [Try our Emissions Explorer Tool](https://eee-capstone.github.io/MIMS-Capstone/vehicleForm/vehicle_form.html)
- [Read our project report](https://www.ischool.berkeley.edu/sites/default/files/sproject_attachments/eee_astoriaclarajosh_mimscapstonefinalpaper_0.pdf)
- [Read our Datasheet](https://docs.google.com/document/d/15uAj8BKXHfsfqDbIANXNfrjy8w1evmyS8of8dsCocIg/edit?usp=sharing)

---
### How to use the tool
Navigate to the [Emissions Explorer](https://eee-capstone.github.io/MIMS-Capstone/vehicleForm/vehicle_form.html). Then, enter a year, make and model for a vehicle you're interested in; a zip-code where you expect to drive, and an estimated owernship time. Hit submit, and we will calculate an emissions estimate for your vehicle! It should look something like this example:
![alt text](https://github.com/EEE-Capstone/MIMS-Capstone/blob/main/EE_output.png)


### More about our tool
We use the GREET life cycle analysis module, developed by Argonne National Laboratory as the basis for our emissions calculations. In addition, we use vehicle and emissions information from the EPA. More about our data sources and model assumptions is located in the [report](https://www.ischool.berkeley.edu/sites/default/files/sproject_attachments/eee_astoriaclarajosh_mimscapstonefinalpaper_0.pdf).

### Datasets used in our tool
All datasets that were used to calculate vehicle lifetime emissions can be found in the Data folder of this GitHub Repository

| Name      | Description |
| ----------- | ----------- |
| adj_weight_data_join_2000_2023.csv | Data for vehicles from model years 2000 to 2023 |
| emissions_factor_LI.csv   | Emissions factors for materials in Lithium Ion EV batteries        |
| emissions_factor_NIMH.csv | Emissions factors for materials in Nickel Metal Hydroxide EV batteries |
| emissions_factor_vehicle.csv| Emissions factors for vehicle materials|
| material_emissions| General emissions factors for materials|
| subregion_emissions.csv| Average grid mix emissions based on EPA eGrid Subregions|
| zip_to_grid.csv| Mapping zip code to EPA eGrid Subregion|
