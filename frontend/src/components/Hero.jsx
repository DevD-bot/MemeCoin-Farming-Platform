import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import logo from '../assets/logo.png';

const Hero = () => {
  return (
    <div className="relative pt-40 pb-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-lg border border-white/5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Institutional Grade Discovery</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
            The Hub for <br />
            <span className="text-gradient">Explosive</span> Memes
          </h1>
          
          <p className="text-lg text-slate-400 mb-12 max-w-xl leading-relaxed">
            A high-performance discovery and farming engine powered by real-time DEX analytics. Track the smart money, launch with integrity, and farm at scale.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="btn-premium px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center gap-3">
              <Rocket size={18} />
              Explore Markets
            </button>
            <button className="px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-slate-300">
              Latest Alpha
            </button>
          </div>
        </motion.div>

        <div className="relative group">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 p-4 glass rounded-[2.5rem] border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-[2.5rem] -z-10"></div>
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-[400px] object-cover rounded-[2rem] opacity-80 mix-blend-screen"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            {/* Real-time floating stat */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border-white/10 shadow-2xl bg-slate-900/90"
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="text-cyan-400 w-4 h-4" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Live Hotness</span>
              </div>
              <div className="text-2xl font-black text-white">99.8<span className="text-cyan-400">%</span></div>
              <div className="text-[10px] text-slate-400">Sentiment Score</div>
            </motion.div>
          </motion.div>
          
          {/* Subtle Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-cyan-600/5 blur-[120px] rounded-full -z-10"></div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
        <StatItem icon={<TrendingUp size={16} />} label="Daily Volume" value="$42.5M" color="cyan" />
        <StatItem icon={<ShieldCheck size={16} />} label="Security Score" value="9.8 / 10" color="blue" />
        <StatItem icon={<Zap size={16} />} label="Active Pools" value="1,248" color="teal" />
        <StatItem icon={<Rocket size={16} />} label="Launched" value="8.4K+" color="sky" />
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, color }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-slate-500">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-xl font-bold text-white pl-6">{value}</div>
  </div>
);

export default Hero;
