from django.db import models

# Create your models here.
## Vehicle model
class Vehicle(models.Model):
## VehicleID_x	Year_x	MFRCode	Make	Model	Range	RangeHwy	atvType	UHighway	UCity	city08U	highway08U	VehicleID_y	Year_y	CurbWeight   
    VID = models.IntegerField()
    Year = models.IntegerField()
    MFRCode = models.CharField(max_length = 3)
    Make = models.CharField(max_length = 50)
    Model = models.CharField(max_length = 50)
    Range = models.IntegerField()
    RangeHwy = models.IntegerField()
    atvType = models.CharField(max_length = 10)
    UHighway = models.FloatField()
    UCity = models.FloatField()
    City08 = models.FloatField()
    Highway08 = models.FloatField()
    CurbWeight = models.FloatField()
    objects = models.Manager()

    def __str__(self):
        return ("make: " + self.Make +  '| model: ' + self.Model)


## Emissions data model
## this isn't technically necessary right now but may be useful later
##	alph_index	Material VOC CO	     NOx 	PM10	PM2.5	     SOx	     BC	     OC	CH4	N2O	CO2	CO2 (VOC, CO, CO2)	     GHGs
class Material_Emissions(models.Model):   
    
    alph_index = models.CharField(max_length = 5)
    material = models.CharField(max_length = 50)
    VOC = models.FloatField()
    CO = models.FloatField()
    NOx = models.FloatField()
    PM10 = models.FloatField()
    PM2p5 = models.FloatField()
    SOx = models.FloatField()
    BC = models.FloatField()
    OC = models.FloatField()
    CH4 = models.FloatField()
    CO2 = models.FloatField()
    CO2_Tot = models.FloatField()
    GHG_Tot = models.FloatField()

    def __str__(self):
        return ("material: " + self.material +  '| index: ' + self.alph_index)


## ZIP code model 
## ZIP, State, Region1, Region2, Region3
class ZIP_Region(models.Model):

    ZIP = models.IntegerField()
    state = models.CharField(max_length = 2)
    region1 = models.CharField(max_length = 10)
    region2 = models.CharField(max_length = 10)
    region3 = models.CharField(max_length = 10)

    def __str__(self):
        return ("state: " + self.state +  '| zip: ' + self.ZIP)

## subregion emissions model
## Region_code	CO2Rate	CH4Rate	N20Rate	CO2eRate	NOXRate	SO2Rate	GridLoss
class Grid_emissions(models.Model):

    Region_code = models.CharField(max_length = 10)
    state = models.CharField(max_length = 2)
    CO2r = models.FloatField()
    CH4r = models.FloatField()
    N20r = models.FloatField()
    CO2Er = models.FloatField()
    NOXr = models.FloatField()
    SO2r = models.FloatField()
    GridLoss = models.FloatField()

    def __str__(self):
        return ("Region code " + self.Region_code +  '| state ' + self.state)


## Vehicle manufacturing emissions weight model
## 	alph_index	Material_x	     VOC	     CO	     NOx 	
# PM10	PM2.5	     SOx	     BC	     OC	CH4	N
# N2O	CO2	CO2 (VOC, CO, CO2)	     GHGs	Material_y	HEV: Conventional Material
# 	HEV: Lightweight Material	PHEV: Conventional Material	PHEV: Lightweight Material	
# EV: Conventional Material	EV: Lightweight Material	
# FCV: Conventional Material	FCV: Lightweight Material

class VehicleWeightings(models.Model):

    alph_index = models.CharField(max_length = 5)
    Material_x = models.CharField(max_length = 50)
    VOC = models.FloatField()
    CO = models.FloatField()
    NOx = models.FloatField()
    N2O = models.FloatField()
    CO2 = models.FloatField()
    CO2_comb = models.FloatField()
    GHGs = models.FloatField()
    Material_y = models.FloatField()
    HEV_conv = models.FloatField()
    HEV_lw = models.FloatField()
    PHEV_conv = models.FloatField()
    PHEV_lw = models.FloatField()
    EV_conv = models.FloatField()
    EV_lw = models.FloatField()
    FCV_conv = models.FloatField()
    FCV_lw = models.FloatField()

    def __str__(self):
        return ("alph_index " + self.alph_index +  '| material' + self.Material_x)



## LI Battery manufacturing emissions weight model
## 	alph_index	Material_x	     VOC	     CO	     NOx 	
# PM10	PM2.5	     SOx	     BC	     OC	CH4	N
# N2O	CO2	CO2 (VOC, CO, CO2)	     GHGs	Material_y	HEV: Conventional Material
# 	HEV: Lightweight Material	PHEV: Conventional Material	PHEV: Lightweight Material	
# EV: Conventional Material	EV: Lightweight Material	
# FCV: Conventional Material	FCV: Lightweight Material

class LIBatteryWeightings(models.Model):

    alph_index = models.CharField(max_length = 5)
    Material_x = models.CharField(max_length = 50)
    VOC = models.FloatField()
    CO = models.FloatField()
    NOx = models.FloatField()
    N2O = models.FloatField()
    CO2 = models.FloatField()
    CO2_comb = models.FloatField()
    GHGs = models.FloatField()
    Material_y = models.FloatField()
    HEV_conv = models.FloatField()
    HEV_lw = models.FloatField()
    PHEV_conv = models.FloatField()
    PHEV_lw = models.FloatField()
    EV_conv = models.FloatField()
    EV_lw = models.FloatField()
    FCV_conv = models.FloatField()
    FCV_lw = models.FloatField()

    def __str__(self):
        return ("alph_index " + self.alph_index +  '| material' + self.Material_x)


## NIMH Battery manufacturing emissions weight model
## 	alph_index	Material_x	     VOC	     CO	     NOx 	
# PM10	PM2.5	     SOx	     BC	     OC	CH4	N
# N2O	CO2	CO2 (VOC, CO, CO2)	     GHGs	Material_y	HEV: Conventional Material
# 	HEV: Lightweight Material	PHEV: Conventional Material	PHEV: Lightweight Material	
# EV: Conventional Material	EV: Lightweight Material	
# FCV: Conventional Material	FCV: Lightweight Material


class NIMHBatteryWeightings(models.Model):

    alph_index = models.CharField(max_length = 5)
    Material_x = models.CharField(max_length = 50)
    VOC = models.FloatField()
    CO = models.FloatField()
    NOx = models.FloatField()
    N2O = models.FloatField()
    CO2 = models.FloatField()
    CO2_comb = models.FloatField()
    GHGs = models.FloatField()
    Material_y = models.FloatField()
    HEV_conv = models.FloatField()
    HEV_lw = models.FloatField()
    PHEV_conv = models.FloatField()
    PHEV_lw = models.FloatField()
    EV_conv = models.FloatField()
    EV_lw = models.FloatField()
    FCV_conv = models.FloatField()
    FCV_lw = models.FloatField()

    def __str__(self):
        return ("alph_index " + self.alph_index +  '| material' + self.Material_x)

