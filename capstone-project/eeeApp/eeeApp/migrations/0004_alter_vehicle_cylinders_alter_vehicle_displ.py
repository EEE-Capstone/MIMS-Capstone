# Generated by Django 4.1.7 on 2023-03-29 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eeeApp", "0003_rename_highway08_vehicle_highway08u"),
    ]

    operations = [
        migrations.AlterField(
            model_name="vehicle",
            name="cylinders",
            field=models.CharField(default="", max_length=10),
        ),
        migrations.AlterField(
            model_name="vehicle",
            name="displ",
            field=models.CharField(default="", max_length=10),
        ),
    ]