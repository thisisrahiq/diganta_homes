import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUrl';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.slug}`} className="group block relative overflow-hidden rounded-sm shadow-xl bg-white h-[28rem]">
      <div 
         className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
         style={{ backgroundImage: `url(${getImageUrl(project.cover_image)})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold tracking-wider mb-4 rounded-sm">
          {project.status?.toUpperCase() || 'PROJECT'}
        </span>
        <h3 className="text-2xl font-heading font-bold text-white mb-2">{project.name}</h3>
        <p className="text-gray-300 text-sm tracking-wider uppercase flex justify-between items-center">
          <span>{project.type}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-accent">Explore +</span>
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
