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
        ## csv option works if cols in csv exactly match model
        # with open(file_path, 'rb') as csv_file:
        #     reader = csv.reader(csv_file, delimiter=',', quotechar='|')
        #     header = reader.next()
        #     for row in reader:
        #         _object_dict = {key: value for key, value in zip(header, row)}
        #         _model.objects.create(**_object_dict)

        # pandas option:

        df=pd.read_csv(file_path)
        row_iter = df.iterrows()
        objs = [model(
                VID = row['VehicleID_x'],
                Year = row['Year_x'],
                MFRCode = row['MFRCode'],
                Make = row['Make'],
                Model = row['Model'],
                Range = row['Range'],
                RangeHwy = row['RangeHwy'],
                atvType = row['atvType'],
                UHighway = row['UHighway'],
                UCity = row['UCity'],
                City08 = row['city08U'],
                Highway08 = row['highway08U'],
                CurbWeight = row['CurbWeight']
            )
            for index, row in row_iter
        ]
        model.objects.bulk_create(objs)