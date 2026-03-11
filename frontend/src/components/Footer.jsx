import React from 'react';
import { Twitter, Github, Linkedin, Shield, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-[#0a0a0b] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="md:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <img src="/favicon.png" alt="MemeFarm Logo" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-black tracking-tight text-white uppercase tracking-widest">
              Meme<span className="text-cyan-500">Farm</span>
            </span>
          </div>
          <p className="text-slate-500 max-w-sm leading-relaxed font-medium text-sm">
            Institutional-grade liquidity provisioning and asset discovery for the next generation of decentralized finance. Powered by the Solana network.
          </p>
          <div className="flex items-center gap-4">
            <SocialIcon icon={<Twitter size={18} />} href="https://x.com/GigaChadTokem" />
            <SocialIcon icon={<Github size={18} />} href="https://github.com/DevD-bot" />
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Ecosystem</h4>
          <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/explore" className="hover:text-cyan-400 transition-colors">Asset Index</Link></li>
            <li><Link to="/launch" className="hover:text-cyan-400 transition-colors">Launch Matrix</Link></li>
            <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Portfolio Node</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Governance</h4>
          <ul className="space-y-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/docs" className="hover:text-cyan-400 transition-colors">Resources</Link></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Audit</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Brand Assets</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600">
        <div className="flex items-center gap-2">
          <Shield size={12} className="text-cyan-500/30" />
          <span>&copy; 2026 MEMEFARM PROTOCOL. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Oracle</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Service Terms</a>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank"
    rel="noreferrer"
    className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all cursor-pointer"
  >
    {icon}
  </a>
);

export default Footer;
