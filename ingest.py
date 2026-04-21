import os
import shutil
import glob
import django
from django.utils.text import slugify

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from projects.models import Project, ProjectImage
from django.core.files import File

MEDIA_DIR = os.path.join(os.path.dirname(__file__), 'Media')
DEST_MEDIA_ROOT = os.path.join(os.path.dirname(__file__), 'media')

os.makedirs(os.path.join(DEST_MEDIA_ROOT, 'projects/covers/'), exist_ok=True)
os.makedirs(os.path.join(DEST_MEDIA_ROOT, 'projects/gallery/'), exist_ok=True)

def parse_project():
    Project.objects.all().delete() # Clean state
    
    # Process members/logo later if needed. For now just root folders starting with digit
    project_dirs = sorted([d for d in os.listdir(MEDIA_DIR) if d[0].isdigit() and os.path.isdir(os.path.join(MEDIA_DIR, d))])
    
    for idx, d in enumerate(project_dirs):
        full_dir = os.path.join(MEDIA_DIR, d)
        
        # Name usually: "1. DIGANTA Kashbon" -> "DIGANTA Kashbon"
        name = " ".join(d.split(' ')[1:]).strip()
        slug = slugify(name)
        
        # Determine status from user prompt logic:
        status = 'ongoing' if 'Shobhan Regency' in name else 'completed'
        
        # Determine type
        ptype = 'residential'
        if 'Khaja Tower' in name: ptype = 'mixed'
        
        # Find md file
        md_files = glob.glob(os.path.join(full_dir, '*.md')) + glob.glob(os.path.join(full_dir, '*.MD'))
        description = "A premium real estate project by Diganta Homes."
        if md_files:
            with open(md_files[0], 'r', encoding='utf-8', errors='ignore') as f:
                description = f.read()

        print(f"Ingesting: {name}")
        
        # Create Project
        proj = Project.objects.create(
            name=name,
            slug=slug,
            type=ptype,
            status=status,
            description=description,
            order=idx,
            is_featured=True if idx < 3 else False
        )
        
        # Find images
        images = sorted(glob.glob(os.path.join(full_dir, '*.png')) + glob.glob(os.path.join(full_dir, '*.jpg')))
        
        if images:
            cover_path = images[0]
            with open(cover_path, 'rb') as f:
                proj.cover_image.save(os.path.basename(cover_path), File(f), save=True)
            
            for img_path in images[1:]:
                pi = ProjectImage(project=proj)
                with open(img_path, 'rb') as f:
                    pi.image.save(os.path.basename(img_path), File(f), save=True)
                pi.save()

if __name__ == '__main__':
    print("Starting ingest process...")
    parse_project()
    print("Ingest process completed.")
