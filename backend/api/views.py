from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer

# Create your views here.
def index(req):
    routes = {
        'C': 'create-task/',
        'R': 'read-tasks/',
        'U': 'update-task/<int:pk>/',
        'D': 'delete-task/<int:pk>/',
    }
    return JsonResponse(routes)

@api_view(['POST'])
def createTask(req):
    serializer = TaskSerializer(data=req.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def readTasks(req):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)

@api_view(['PUT'])
def updateTask(req, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=req.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTask(req, pk):
    try:
        task = Task.objects.get(id=pk)
        task.delete()
        return Response("Item deleted successfully")
    except Task.DoesNotExist:
        return Response("Item doesn't exist")