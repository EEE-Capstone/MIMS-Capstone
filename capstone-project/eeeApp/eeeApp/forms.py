from django import forms
from eeeApp.models import Vehicle

def create_choices(values):
    cleaned = []
    for val in values:
        clean_val = str(val).strip(" ,()'")
        cleaned.append((clean_val, clean_val))
    return cleaned

def make_choices(col):
    ## get choice options
    if col == 'Year':
        values = list(set(Vehicle.objects.values_list('Year')))
        return create_choices(values)
    elif col == 'Make':
        values = list(set(Vehicle.objects.values_list('Make')))
        return create_choices(values)
    elif col == 'Model':
        values = list(set(Vehicle.objects.values_list('Model')))
        return create_choices(values)
    else:
        return [()]

# define a Form class
class testForm(forms.Form):
    # class Meta: 
    #     model = Vehicle 
    #     fields = ('year', 'make', 'model', 'zipcode')
    # def __init__ (self, *args, **kwargs):
    #     super().__init__( *args, **kwargs)
    #     self.fields['year'].queryset = Vehicle.objects.none()

    your_name = forms.CharField(label='Your name', max_length=100, initial='John Doe', required=True)
    todays_date = forms.TimeField(label='Todays Date', disabled=True, required = False)
    age = forms.IntegerField(label='How old are you?', min_value=1, max_value=100, initial=22)
    favorite_animal = forms.MultipleChoiceField(label='What is your favorite animal?', choices=[(1, 'Cat'), (2, 'Dog'), (3, 'Rabbit')])

# define a Form class
class vehicleForm(forms.Form):
    year = forms.MultipleChoiceField(label='Year', choices=make_choices('Year'),required = True)
    make = forms.MultipleChoiceField(label='Make', choices=make_choices('Make'), required = True)
    model = forms.MultipleChoiceField(label='Model', choices=make_choices('Model'), required = True)
    zipcode = forms.IntegerField(label = 'Zip', required = True)
