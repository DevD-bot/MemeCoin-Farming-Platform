import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ExternalLink, Clock, Globe, ShieldCheck, Heart } from 'lucide-react';
import axios from 'axios';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

const MemeFeed = () => {
  const [news, setNews] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    socket.on('memeNews', (data) => {
      const newItem = {
        ...data,
        id: data.mint || Math.random(),
        source: 'PumpPortal',
        type: 'LAUNCH',
        timestamp: new Date().getTime()
      };
      setNews((prev) => [newItem, ...prev].slice(0, 10));
    });

    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dex/boosts/latest`);
        const profiledItems = response.data.slice(0, 5).map(item => ({
          id: item.tokenAddress,
          name: item.tokenAddress.slice(0, 8),
          symbol: 'BOOSTED',
          image: item.icon,
          source: 'DEX Screener',
          type: 'PROFILE',
          url: item.url,
          timestamp: new Date().getTime()
        }));
        setProfiles(profiledItems);
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      }
    };

    fetchProfiles();
    const interval = setInterval(fetchProfiles, 30000);

    return () => {
      socket.off('memeNews');
      clearInterval(interval);
    };
  }, []);

  const allItems = [...news, ...profiles].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);

  if (allItems.length === 0) {
    return (
      <div className="glass p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center border-white/5">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 animate-pulse border border-white/5">
          <Globe className="text-cyan-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Synchronizing Pulse...</h3>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Awaiting decentralized feed data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
          <Globe className="text-cyan-500 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tight uppercase tracking-widest">Global <span className="text-gradient">Pulse</span></h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Real-time Network Telemetry</p>
        </div>
      </div>

      <div className="relative">
        <AnimatePresence initial={false}>
          {allItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass p-5 rounded-2xl mb-4 border-white/5 relative overflow-hidden group hover:bg-white/5 transition-all"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 overflow-hidden group-hover:scale-105 transition-transform">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${item.symbol}&background=0f172a&color=2dd4bf` }}
                        />
                      ) : (
                        <div className="font-black text-cyan-400 text-sm">{item.symbol?.[0] || '?'}</div>
                      )}
                    </div>
                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-md border-2 border-slate-900 flex items-center justify-center ${item.type === 'LAUNCH' ? 'bg-cyan-500' : 'bg-blue-500'}`}>
                      {item.type === 'LAUNCH' ? <Zap size={8} className="text-slate-950" /> : <ShieldCheck size={8} className="text-white" />}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold flex items-center gap-2 mb-1">
                      <span className="truncate max-w-[120px] text-white text-sm">{item.name || 'Anonymous Asset'}</span>
                    </h4>
                    <div className="flex items-center gap-2">
                       <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border ${item.source === 'PumpPortal' ? 'text-cyan-400 border-cyan-400/20 bg-cyan-400/5' : 'text-blue-400 border-blue-400/20 bg-blue-400/5'} uppercase tracking-widest`}>
                        {item.source}
                      </span>
                      <span className="text-[8px] text-slate-500 flex items-center gap-1 font-bold uppercase tracking-widest">
                        <Clock size={8} /> LIVE
                      </span>
                    </div>
                  </div>
                </div>
                <a 
                  href={item.url || `https://pump.fun/${item.mint}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-3 bg-white/5 rounded-xl hover:bg-cyan-500 hover:text-slate-950 transition-all text-slate-500"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemeFeed;
