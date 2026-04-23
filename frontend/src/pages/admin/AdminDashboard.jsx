import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Building2, Briefcase, Newspaper } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    messages: 0,
    projects: 0,
    careers: 0,
    news: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Token ${token}` };

      try {
        const [msgRes, projRes, careerRes, newsRes] = await Promise.all([
          fetch(`${API_URL}/api/messages/`, { headers }),
          fetch(`${API_URL}/api/projects/`),
          fetch(`${API_URL}/api/careers/`),
          fetch(`${API_URL}/api/news/`)
        ]);

        const [messages, projects, careers, news] = await Promise.all([
          msgRes.json(),
          projRes.json(),
          careerRes.json(),
          newsRes.json()
        ]);

        setStats({
          messages: messages.length || 0,
          projects: projects.length || 0,
          careers: careers.length || 0,
          news: news.length || 0
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Messages', value: stats.messages, icon: MessageSquare, color: 'text-blue-500' },
    { name: 'Active Projects', value: stats.projects, icon: Building2, color: 'text-accent' },
    { name: 'Job Openings', value: stats.careers, icon: Briefcase, color: 'text-green-500' },
    { name: 'News Posts', value: stats.news, icon: Newspaper, color: 'text-purple-500' },
  ];

  if (loading) {
    return <div className="animate-pulse flex items-center justify-center h-full text-accent uppercase tracking-widest text-xs font-bold">Initializing Dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold text-white mb-2">Overview</h1>
        <p className="text-white/40 text-sm tracking-widest uppercase">System status and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.name} className="bg-[#111111] border border-white/5 p-8 group hover:border-accent/30 transition-all duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 bg-white/5 rounded-sm ${card.color} group-hover:bg-accent group-hover:text-white transition-all duration-500`}>
                  <Icon size={24} />
                </div>
                <span className="text-4xl font-heading font-bold text-white">{card.value}</span>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 font-bold">{card.name}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111111] border border-white/5 p-8">
          <h3 className="text-xl font-heading font-bold text-white mb-6 uppercase tracking-wider">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate('/admin/projects')} className="p-4 bg-white/5 border border-white/5 hover:border-accent/40 text-[10px] font-bold tracking-widest uppercase transition-all">Manage Projects</button>
            <button onClick={() => navigate('/admin/news')} className="p-4 bg-white/5 border border-white/5 hover:border-accent/40 text-[10px] font-bold tracking-widest uppercase transition-all">Manage News</button>
            <button onClick={() => navigate('/admin/careers')} className="p-4 bg-white/5 border border-white/5 hover:border-accent/40 text-[10px] font-bold tracking-widest uppercase transition-all">Manage Careers</button>
            <button onClick={() => navigate('/admin/messages')} className="p-4 bg-white/5 border border-white/5 hover:border-accent/40 text-[10px] font-bold tracking-widest uppercase transition-all">View Messages</button>
          </div>
        </div>
        
        <div className="bg-[#111111] border border-white/5 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-white/40 text-xs tracking-widest uppercase">System Health: Optimal</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
