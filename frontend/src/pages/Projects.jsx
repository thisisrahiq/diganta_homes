import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/projects/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    console.log("Fetching projects from:", `${API_URL}/api/projects/`);
    fetch(`${API_URL}/api/projects/`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'completed') return p.status === 'completed';
    if (filter === 'ongoing') return p.status === 'ongoing';
    if (filter === 'commercial') return p.type === 'commercial' || p.type === 'mixed';
    if (filter === 'residential') return p.type === 'residential' || p.type === 'mixed';
    return true;
  });

  return (
    <div className="pt-24 min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Our Portfolio</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our diverse range of residential and commercial properties.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'completed', 'ongoing', 'residential', 'commercial'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-colors ${
                filter === tab ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
