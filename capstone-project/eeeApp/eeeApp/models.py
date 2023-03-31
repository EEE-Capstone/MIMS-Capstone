from django.db import models

# Create your models here.
## Vehicle model
class Vehicle(models.Model):
## VehicleID_x	Year_x	MFRCode	Make	Model	Range	RangeHwy	atvType	UHighway	UCity	city08U	highway08U	VehicleID_y	Year_y	CurbWeight   
## 'Model_y', 'Make_y', 'Year', 'atvType', 'cylinders', 'displ', 'trany',
##     'VehicleID', 'AdjWeight', 'comb08', 'combinedUF', 'combE', 'highway08U',
##      'rangeHwyA', 'RangeHwy', 'Range', 'city08U', 'UCity', 'UHighway'   
   
    Model = models.CharField(max_length = 50)
    Make = models.CharField(max_length = 50)
    Year = models.IntegerField()
    atvType = models.CharField(max_length = 10)
    cylinders = models.CharField(default = '', max_length = 10)
    displ = models.CharField(default = '', max_length = 10)
    transmission_type = models.CharField(max_length = 100, default = 'NA')
    VID = models.IntegerField()
    AdjWeight = models.FloatField(default = 0)
    comb08 = models.IntegerField(default = 0)
    combinedUF = models.FloatField(default = 0)
    combE = models.FloatField(default = 0)
    Highway08U = models.FloatField()
    RangeHwyA = models.FloatField(default = 0)
    RangeHwy = models.IntegerField()
    Range = models.IntegerField()
    City08U = models.FloatField(default = 0)
    UCity = models.FloatField()
    UHighway = models.FloatField()
    # MFRCode = models.CharField(max_length = 3)
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
    State = models.CharField(max_length = 2)
    Subregion1 = models.CharField(max_length = 10)
    Subregion2 = models.CharField(max_length = 10)
    Subregion3 = models.CharField(max_length = 10)

    def __str__(self):
        return ("state: " + self.State +  '| zip: ' + self.ZIP)

## subregion emissions model
## Region_code	CO2Rate	CH4Rate	N20Rate	CO2eRate	NOXRate	SO2Rate	GridLoss
class Grid_emissions(models.Model):

    Region_code = models.CharField(max_length = 10)
    # state = models.CharField(max_length = 2)
    CO2Rate = models.FloatField()
    CH4Rate = models.FloatField()
    N2ORate = models.FloatField()
    CO2eRate = models.FloatField()
    NOXRate = models.FloatField()
    SO2Rate = models.FloatField()
    GridLoss = models.FloatField()

    def __str__(self):
        return ("Region code " + self.Region_code +  '| CO2eRate ' + self.CO2eRate)


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
    PM10 = models.FloatField(default=0)
    PM2p5 = models.FloatField(default=0)
    SOx = models.FloatField(default=0)
    BC = models.FloatField(default=0)
    OC = models.FloatField(default=0)
    CH4 = models.FloatField(default=0)
    N2O = models.FloatField()
    CO2 = models.FloatField()
    CO2_comb = models.FloatField()
    GHGs = models.FloatField()
    Material_y = models.CharField(max_length = 50)
    ICE_conv = models.FloatField(default=0)
    ICE_lw = models.FloatField(default=0)
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
    PM10 = models.FloatField(default=0)
    PM2p5 = models.FloatField(default=0)
    SOx = models.FloatField(default=0)
    BC = models.FloatField(default=0)
    OC = models.FloatField(default=0)
    CH4 = models.FloatField(default=0)
    N2O = models.FloatField()
    CO2 = models.FloatField()
    CO2_comb = models.FloatField()
    GHGs = models.FloatField()
    Material_y = models.CharField(max_length = 50)
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
    PM10 = models.FloatField(default=0)
    PM2p5 = models.FloatField(default=0)
    SOx = models.FloatField(default=0)
    BC = models.FloatField(default=0)
    OC = models.FloatField(default=0)
    CH4 = models.FloatField(default=0)
    N2O = models.FloatField()
    CO2 = models.FloatField()
    CO2_comb = models.FloatField()
    GHGs = models.FloatField()
    Material_y = models.CharField(max_length = 50)
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

