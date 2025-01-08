from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import TodoItem
from .serializers import TodoItemSerializer

@api_view(['GET', 'POST'])
def todo_list(request):
    if request.method == 'GET':
        todos = TodoItem.objects.all()
        serializer = TodoItemSerializer(todos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TodoItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['DELETE'])
def todo_delete(request, pk):
    try:
        todo = TodoItem.objects.get(pk=pk)
    except TodoItem.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    todo.delete()
    return Response({'message': 'Todo deleted'}, status=204)
