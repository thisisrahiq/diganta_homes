from rest_framework import serializers
from .models import JobOpening, JobApplication

class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    opening_title = serializers.ReadOnlyField(source='opening.title')
    
    class Meta:
        model = JobApplication
        fields = '__all__'
