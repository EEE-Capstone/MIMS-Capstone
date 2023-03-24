from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from eeeApp.forms import testForm, vehicleForm
from django.urls import reverse

#from .models import _______

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
        # print(form.favorite_animal)
        if form.is_valid():
            #process the data 
            #redirect to a new URL: 
            return HttpResponseRedirect('/eeeApp/thanks/')
        #If it is a GET (or any other method), create a blank form
    else: 
        form = testForm()
        # print(form.data)
    return render(request, 'testForm.html', {'form': form})

def get_vehicle(request):
    #POST request means process data 
    if request.method == 'POST':
        # create a form instance and population with data from request
        form = vehicleForm(request.POST)
        # print(form.favorite_animal)
        if form.is_valid():
            #process the data 
            #redirect to a new URL: 
            return HttpResponseRedirect('/eeeApp/thanks/')
        #If it is a GET (or any other method), create a blank form
    else: 
        form = vehicleForm()
        # print(form.data)
    return render(request, 'vehicleForm.html', {'form': form})


def redirect(request):
    return HttpResponse("Thanks for submitting!")
