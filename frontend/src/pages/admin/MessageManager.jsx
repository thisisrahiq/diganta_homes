import React, { useState, useEffect } from 'react';
import { Mail, User, Phone, Calendar, Trash2, Eye } from 'lucide-react';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/api/messages/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_URL}/api/messages/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${token}` }
      });
      setMessages(messages.filter(m => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (msg) => {
    if (msg.is_read) return;
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_URL}/api/messages/${msg.id}/`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_read: true })
      });
      if (res.ok) {
        setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-20 text-accent font-bold uppercase tracking-[0.3em] text-xs">Loading correspondence...</div>;

  return (
    <div className="flex gap-8 h-[calc(100vh-140px)]">
      {/* List */}
      <div className="w-1/3 bg-[#111111] border border-white/5 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white">Inbox</h2>
            <span className="text-[10px] text-accent font-bold bg-accent/10 px-2 py-0.5 rounded-full">{messages.length}</span>
        </div>
        <div className="flex-grow overflow-y-auto">
          {messages.length === 0 ? (
            <div className="p-10 text-center text-white/20 text-xs tracking-widest italic">No messages yet</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  markAsRead(msg);
                }}
                className={`p-6 border-b border-white/5 cursor-pointer transition-all ${
                  selectedMessage?.id === msg.id ? 'bg-white/5 border-l-2 border-l-accent' : 'hover:bg-white/2'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${msg.is_read ? 'text-white/30' : 'text-accent'}`}>
                    {msg.is_read ? 'Read' : 'New Message'}
                  </span>
                  <span className="text-[9px] text-white/20">{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1 truncate">{msg.subject}</h4>
                <p className="text-[11px] text-white/40 truncate">{msg.name}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-grow bg-[#111111] border border-white/5 overflow-y-auto">
        {selectedMessage ? (
          <div className="p-12">
            <div className="flex justify-between items-start mb-12 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-4">{selectedMessage.subject}</h2>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <User size={14} className="text-accent" />
                    <span className="font-bold tracking-widest uppercase">{selectedMessage.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Mail size={14} className="text-accent" />
                    <span>{selectedMessage.email}</span>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <Phone size={14} className="text-accent" />
                      <span>{selectedMessage.phone}</span>
                    </div>
                  )}
                  {selectedMessage.plot_size_katha && (
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <span className="text-accent font-bold uppercase tracking-widest text-[9px]">Land Size:</span>
                      <span>{selectedMessage.plot_size_katha}</span>
                    </div>
                  )}
                  {selectedMessage.plot_size_sqft && (
                    <div className="flex items-center gap-2 text-white/40 text-xs">
                      <span className="text-accent font-bold uppercase tracking-widest text-[9px]">Plot Size:</span>
                      <span>{selectedMessage.plot_size_sqft}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-white/40 text-xs">
                    <Calendar size={14} className="text-accent" />
                    <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteMessage(selectedMessage.id)}
                className="p-3 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-full"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="text-white/70 leading-relaxed space-y-4">
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            
            <div className="mt-16 pt-12 border-t border-white/5 flex gap-4">
                <a href={`mailto:${selectedMessage.email}`} className="bg-accent text-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500">
                    Reply via Email
                </a>
                <button className="border border-white/10 text-white/60 px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-white hover:text-white transition-all duration-500">
                    Archive
                </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Eye size={32} className="text-white/10" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2 uppercase tracking-widest">Select a Message</h3>
            <p className="text-white/30 text-xs tracking-widest max-w-xs">Select a message from the left panel to view its full content and details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageManager;
