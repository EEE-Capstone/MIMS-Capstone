from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
#from .models import _______
from.forms import testForm


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the eeeApp index.")

def test(request):
    template = loader.get_template('test.html')
    context = {}
    return HttpResponse(template.render(context, request))

def get_name(request):
    #POST request means process data 
    if request.method == 'POST':
        # create a form instance and population with data from request
        form = testForm(request.POST)
        if form.is_valid():
            #process the data 
            #redirect to a new URL: 
            return HttpResponseRedirect('/thanks/')
        #If it is a GET (or any other method), create a blank form
    else: 
        form= testForm()
    return render(request, 'testForm.html', {'form': form})

# *** HOW TO ADD A MODEL INTO YOUR TEMPLATE ***
# def members(request):
#     modelInstance = modelName.objects.all().values()
#     template = loader.get_template("htmlName.html")
#     context= {
#         'modelInstance: modelInstance'
#     }
#     return HttpResponse(template.render(context, request))
