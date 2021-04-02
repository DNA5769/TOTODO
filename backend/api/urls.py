from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('create-task/', views.createTask),
    path('read-tasks/', views.readTasks),
    path('update-task/<int:pk>/', views.updateTask),
    path('delete-task/<int:pk>/', views.deleteTask),
]