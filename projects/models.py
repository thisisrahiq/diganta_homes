from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    type = models.CharField(max_length=50, choices=[('residential', 'Residential'), ('commercial', 'Commercial'), ('mixed', 'Mixed-use')])
    status = models.CharField(max_length=50, choices=[('completed', 'Completed'), ('ongoing', 'Ongoing')])
    description = models.TextField()
    floors = models.IntegerField(null=True, blank=True)
    cover_image = models.ImageField(upload_to='projects/covers/', null=True, blank=True)
    brochure = models.FileField(upload_to='projects/brochures/', null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.project.name} Image"
