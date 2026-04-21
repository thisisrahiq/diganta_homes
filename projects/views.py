from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer, ProjectListSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all().order_by('order', '-created_at')
    serializer_class = ProjectListSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        # Optional filters:
        status_filter = self.request.query_params.get('status', None)
        type_filter = self.request.query_params.get('type', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if type_filter:
            queryset = queryset.filter(type=type_filter)
        return queryset

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

class FeaturedProjectListView(generics.ListAPIView):
    queryset = Project.objects.filter(is_featured=True).order_by('order', '-created_at')
    serializer_class = ProjectListSerializer
