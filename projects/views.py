from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer, ProjectListSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('order', '-created_at')
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status', None)
        type_filter = self.request.query_params.get('type', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if type_filter:
            queryset = queryset.filter(type=type_filter)
        return queryset

class FeaturedProjectListView(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_featured=True).order_by('order', '-created_at')
    serializer_class = ProjectListSerializer
