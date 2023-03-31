from django.core.management.base import BaseCommand
from django.apps import apps
import csv
import pandas as pd


class Command(BaseCommand):
    help = 'Creating model objects according the file path specified'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str, help="file path")
        parser.add_argument('--model_name', type=str, help="model name")
        parser.add_argument('--app_name', type=str, help="django app name that the model is connected to")

    def handle(self, *args, **options):
        file_path = options['path']
        model = apps.get_model(options['app_name'], options['model_name'])
        ## delete existing entries in model
        model.objects.all().delete()
        ## csv option works if cols in csv exactly match model
        # with open(file_path, 'rb') as csv_file:
        #     reader = csv.reader(csv_file, delimiter=',', quotechar='|')
        #     header = reader.next()
        #     for row in reader:
        #         _object_dict = {key: value for key, value in zip(header, row)}
        #         _model.objects.create(**_object_dict)

        # pandas option:

        if options['model_name'] == 'Vehicle':

            df=pd.read_csv(file_path)
            row_iter = df.iterrows()
            objs = [model(
                    # VID = row['VehicleID_x'],
                    # Year = row['Year_x'],
                    # MFRCode = row['MFRCode'],
                    # Make = row['Make_y'],
                    # Model = row['Model_y'],
                    # Range = row['Range'],
                    # RangeHwy = row['RangeHwy'],
                    # atvType = row['atvType'],
                    # UHighway = row['UHighway'],
                    # UCity = row['UCity'],
                    # City08 = row['city08U'],
                    # Highway08 = row['highway08U'],
                    # CurbWeight = row['CurbWeight']
                    Model = row['Model_y'],
                    Make = row['Make_y'],
                    Year = row['Year'],
                    atvType = row['atvType'],
                    cylinders = row['cylinders'],
                    displ = row['displ'],
                    transmission_type = row['trany'],
                    VID = row['VehicleID'],
                    AdjWeight = row['AdjWeight'],
                    comb08 = row['comb08'],
                    combinedUF = row['combinedUF'],
                    combE = row['combE'],
                    Highway08U = row['highway08U'],
                    RangeHwyA = row['rangeHwyA'],
                    RangeHwy = row['RangeHwy'],
                    Range = row['Range'],
                    City08U = row['city08U'],
                    UCity = row['UCity'],
                    UHighway = row['UHighway']
                )
                for index, row in row_iter
            ]
            model.objects.bulk_create(objs)
        else:
            with open(file_path, 'r') as csv_file:
                reader = csv.reader(csv_file, delimiter=',', quotechar='|')
                header = next(reader)
                for row in reader:
                    object_dict = {key: value for key, value in zip(header, row)}
                    model.objects.create(**object_dict) 