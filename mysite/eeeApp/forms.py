from django import forms
from eeeApp.models import Vehicle

# define a Form class
class testForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100, initial='John Doe', required=True)
    todays_date = forms.TimeField(label='Todays Date', disabled=True)
    age = forms.IntegerField(label='How old are you?', min_value=1, max_value=100, initial=22)
    favorite_animal = forms.MultipleChoiceField(label='What is your favorite animal?', choices=[(1, 'Cat'), (2, 'Dog'), (3, 'Rabbit')])

def make_choices(Vehicle):
    ## get choice options
    years = list(set(Vehicle.objects.values_list('Year')))
    makes = list(set(Vehicle.objects.values_list('Make')))
    models = list(set(Vehicle.objects.values_list('Model')))
    ## create choice dictionaries for each choice option
    years_choices = []
    for year in years:
        years_choices.append((int(year), str(year)))
    makes_choices = []
    for make in makes:
        makes_choices.append((make, make))
    models_choices = []
    for model in models:
        models_choices.append((model, model))

    return years_choices, makes_choices, models_choices


choices = make_choices(Vehicle)


class EmissionsToolForm(forms.Form):
    # year - need a choices argument 
    year = forms.ChoiceField(required = True, label='Vehicle Year', choices= choices[0])
    # make - need a choices argument 
    make = forms.ChoiceField(required = True, label='Make', choices= choices[1])
    #model - need a choices argument 
    model = forms.ChoiceField(required = True, label='Model', choices= choices[2])
    #zipcode 
    zipcode = forms.CharField(required=True, label="Zipcode", min_length=6, max_length=6, strip=True)



