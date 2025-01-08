from django.urls import path
from . import views

from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('todos/', views.todo_list, name='todo_list'),
    path('todos/<int:pk>/', views.todo_delete, name='todo_delete'),
    path('admin/', admin.site.urls),
    path('api/', include('todo.urls')),
]
