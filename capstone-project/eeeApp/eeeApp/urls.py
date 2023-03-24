from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('test/', views.test, name='test'),
    path('testForm/', views.get_name, name='testForm'),
    path('vehicleForm/', views.get_vehicle, name = 'vehicleForm'),
    path('thanks/', views.redirect, name='redirect')
]