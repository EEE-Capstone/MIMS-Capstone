# Generated by Django 4.1.7 on 2023-03-21 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Grid_emissions",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("Region_code", models.CharField(max_length=10)),
                ("state", models.CharField(max_length=2)),
                ("CO2r", models.FloatField()),
                ("CH4r", models.FloatField()),
                ("N20r", models.FloatField()),
                ("CO2Er", models.FloatField()),
                ("NOXr", models.FloatField()),
                ("SO2r", models.FloatField()),
                ("GridLoss", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="LIBatteryWeightings",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("alph_index", models.CharField(max_length=5)),
                ("Material_x", models.CharField(max_length=50)),
                ("VOC", models.FloatField()),
                ("CO", models.FloatField()),
                ("NOx", models.FloatField()),
                ("N2O", models.FloatField()),
                ("CO2", models.FloatField()),
                ("CO2_comb", models.FloatField()),
                ("GHGs", models.FloatField()),
                ("Material_y", models.FloatField()),
                ("HEV_conv", models.FloatField()),
                ("HEV_lw", models.FloatField()),
                ("PHEV_conv", models.FloatField()),
                ("PHEV_lw", models.FloatField()),
                ("EV_conv", models.FloatField()),
                ("EV_lw", models.FloatField()),
                ("FCV_conv", models.FloatField()),
                ("FCV_lw", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Material_Emissions",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("alph_index", models.CharField(max_length=5)),
                ("material", models.CharField(max_length=50)),
                ("VOC", models.FloatField()),
                ("CO", models.FloatField()),
                ("NOx", models.FloatField()),
                ("PM10", models.FloatField()),
                ("PM2p5", models.FloatField()),
                ("SOx", models.FloatField()),
                ("BC", models.FloatField()),
                ("OC", models.FloatField()),
                ("CH4", models.FloatField()),
                ("CO2", models.FloatField()),
                ("CO2_Tot", models.FloatField()),
                ("GHG_Tot", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="NIMHBatteryWeightings",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("alph_index", models.CharField(max_length=5)),
                ("Material_x", models.CharField(max_length=50)),
                ("VOC", models.FloatField()),
                ("CO", models.FloatField()),
                ("NOx", models.FloatField()),
                ("N2O", models.FloatField()),
                ("CO2", models.FloatField()),
                ("CO2_comb", models.FloatField()),
                ("GHGs", models.FloatField()),
                ("Material_y", models.FloatField()),
                ("HEV_conv", models.FloatField()),
                ("HEV_lw", models.FloatField()),
                ("PHEV_conv", models.FloatField()),
                ("PHEV_lw", models.FloatField()),
                ("EV_conv", models.FloatField()),
                ("EV_lw", models.FloatField()),
                ("FCV_conv", models.FloatField()),
                ("FCV_lw", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Vehicle",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("VID", models.IntegerField()),
                ("Year", models.IntegerField()),
                ("MFRCode", models.CharField(max_length=3)),
                ("Make", models.CharField(max_length=50)),
                ("Model", models.CharField(max_length=50)),
                ("Range", models.IntegerField()),
                ("RangeHwy", models.IntegerField()),
                ("atvType", models.CharField(max_length=10)),
                ("UHighway", models.FloatField()),
                ("UCity", models.FloatField()),
                ("City08", models.FloatField()),
                ("Highway08", models.FloatField()),
                ("CurbWeight", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="VehicleWeightings",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("alph_index", models.CharField(max_length=5)),
                ("Material_x", models.CharField(max_length=50)),
                ("VOC", models.FloatField()),
                ("CO", models.FloatField()),
                ("NOx", models.FloatField()),
                ("N2O", models.FloatField()),
                ("CO2", models.FloatField()),
                ("CO2_comb", models.FloatField()),
                ("GHGs", models.FloatField()),
                ("Material_y", models.FloatField()),
                ("HEV_conv", models.FloatField()),
                ("HEV_lw", models.FloatField()),
                ("PHEV_conv", models.FloatField()),
                ("PHEV_lw", models.FloatField()),
                ("EV_conv", models.FloatField()),
                ("EV_lw", models.FloatField()),
                ("FCV_conv", models.FloatField()),
                ("FCV_lw", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="ZIP_Region",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ZIP", models.IntegerField()),
                ("state", models.CharField(max_length=2)),
                ("region1", models.CharField(max_length=10)),
                ("region2", models.CharField(max_length=10)),
                ("region3", models.CharField(max_length=10)),
            ],
        ),
    ]