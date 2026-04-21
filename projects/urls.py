from django.urls import path
from .views import ProjectListView, ProjectDetailView, FeaturedProjectListView

urlpatterns = [
    path('', ProjectListView.as_view(), name='project-list'),
    path('featured/', FeaturedProjectListView.as_view(), name='project-featured-list'),
    path('<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
]
