from django import forms

class EmissionsToolForm(forms.Form):
    # year - need a choices argument 
    year = forms.ChoiceField(required = True, label='Vehicle Year', choices="")
    # make - need a choices argument 
    make = forms.ChoiceField(required = True, label='Make', choices="")
    #model - need a choices argument 
    model = forms.ChoiceField(required = True, label='Model', choices="")
    #zipcode 
    zipcode = forms.CharField(required=True, label="Zipcode", min_length=6, max_length=6, strip=True)



