import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Briefcase, 
  Newspaper, 
  Building2, 
  LogOut,
  Home,
  Plus
} from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
    { name: 'Projects', path: '/admin/projects', icon: Building2 },
    { name: 'Careers', path: '/admin/careers', icon: Briefcase },
    { name: 'News', path: '/admin/news', icon: Newspaper },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-[#111111] border-r border-white/10 flex flex-col fixed h-screen z-30">
        <div className="p-8 border-b border-white/5">
          <Link to="/" className="flex flex-col leading-none group">
            <span className="font-bodoni-moda font-bold text-lg tracking-[0.2em] text-white uppercase">Diganta</span>
            <span className="text-accent text-[8px] font-bold uppercase mt-1 tracking-[0.5em]">L I M I T E D</span>
          </Link>
          <div className="mt-8 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full inline-block">
            <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Admin Control</span>
          </div>
        </div>

        <nav className="flex-grow p-6 space-y-2 overflow-y-auto">
          <div className="mb-8">
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4 px-4">Navigation</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-4 rounded-sm transition-all duration-300 group ${
                    isActive 
                    ? 'bg-accent text-white shadow-[0_0_20px_rgba(182,162,111,0.2)]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'group-hover:text-accent transition-colors'} />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div>
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4 px-4">Direct Actions</p>
            <div className="space-y-1">
                <button onClick={() => navigate('/admin/projects')} className="w-full flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest group">
                    <Plus size={14} className="text-accent" />
                    <span>Add Project</span>
                </button>
                <button onClick={() => navigate('/admin/news')} className="w-full flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest group">
                    <Plus size={14} className="text-accent" />
                    <span>Add News</span>
                </button>
                <button onClick={() => navigate('/admin/careers')} className="w-full flex items-center gap-4 px-4 py-3 text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest group">
                    <Plus size={14} className="text-accent" />
                    <span>Add Career</span>
                </button>
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <Link to="/" className="flex items-center gap-4 px-4 py-3 text-white/40 hover:text-white transition-colors group">
            <Home size={18} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all rounded-sm group"
          >
            <LogOut size={18} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72 bg-[#0a0a0a]">
        {/* Top Navbar for Admin */}
        <header className="h-20 bg-[#111111]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-20">
            <div className="flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-widest">
                <span className="text-accent">System</span>
                <span>/</span>
                <span className="text-white">{location.pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => navigate('/admin/projects')}
                    className="flex items-center gap-2 text-[9px] font-bold text-white/60 hover:text-accent transition-all uppercase tracking-[0.2em]"
                >
                    <Plus size={14} /> Add Project
                </button>
                <button 
                    onClick={() => navigate('/admin/news')}
                    className="flex items-center gap-2 text-[9px] font-bold text-white/60 hover:text-accent transition-all uppercase tracking-[0.2em]"
                >
                    <Plus size={14} /> Add News
                </button>
                <button 
                    onClick={() => navigate('/admin/careers')}
                    className="flex items-center gap-2 text-[9px] font-bold text-white/60 hover:text-accent transition-all uppercase tracking-[0.2em]"
                >
                    <Plus size={14} /> Add Career
                </button>
            </div>
        </header>

        <div className="p-10">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
