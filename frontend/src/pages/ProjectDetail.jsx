import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${API_URL}/api/projects/${slug}/`)
      .then(res => res.json())
      .then(data => {
        // Strip ** markdown tags and replace with <strong>
        if (data.description) {
           data.description = data.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }
        setProject(data);
      })
      .catch(err => console.error(err));
  }, [slug]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center pt-24 text-accent animate-pulse font-heading text-xl">Loading Masterpiece...</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full bg-primary">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${project.cover_image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 max-w-7xl mx-auto flex flex-col items-start text-white">
            <span className="inline-block px-4 py-1 bg-accent text-white text-sm font-bold tracking-widest mb-6 rounded-sm uppercase">
                {project.status}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">{project.name}</h1>
            <p className="text-lg tracking-widest text-gray-300 uppercase">{project.type} Development</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
                <h2 className="text-3xl font-heading font-bold mb-6 border-b-2 border-accent inline-block pb-2">Project Overview</h2>
                <div className="prose prose-lg max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: project.description }} />
            </div>

            <div className="bg-surface p-8 rounded-sm shadow-lg border border-gray-100">
                <h3 className="text-xl font-heading font-bold mb-6 text-primary">Quick Facts</h3>
                <ul className="space-y-4 text-sm font-bold tracking-widest text-gray-500 uppercase">
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span>Status</span>
                        <span className="text-primary">{project.status}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span>Type</span>
                        <span className="text-primary">{project.type}</span>
                    </li>
                    <li className="flex justify-between border-b border-gray-200 pb-2">
                        <span>Floors</span>
                        <span className="text-primary">{project.floors || 'N/A'}</span>
                    </li>
                </ul>
                <div className="mt-8">
                    <a href={`https://wa.me/8801800000000?text=I am interested in ${project.name}`} target="_blank" rel="noreferrer" className="w-full block text-center bg-primary text-white py-3 hover:bg-accent transition-colors font-bold tracking-widest text-sm uppercase rounded-sm">
                        Inquire Now
                    </a>
                </div>
            </div>
        </div>

        {/* Gallery */}
        {project.images && project.images.length > 0 && (
            <div className="mt-20">
                <h2 className="text-3xl font-heading font-bold mb-10 text-center">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.images.map((img, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => setLightboxImg(img.image)}
                            className="relative h-64 overflow-hidden group rounded-sm shadow-md cursor-pointer"
                        >
                            <img 
                                src={img.image} 
                                alt={img.caption || `${project.name} gallery image`} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                            />
                            <div className="absolute inset-0 bg-[#111111]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white border border-white px-4 py-2 text-xs tracking-widest uppercase">View</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-[#111111]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 transition-all">
            <button 
                onClick={() => setLightboxImg(null)}
                className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-accent font-bold text-2xl"
            >
                ✕
            </button>
            <img src={lightboxImg} alt="Enlarged view" className="max-w-full max-h-full object-contain shadow-2xl" />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
