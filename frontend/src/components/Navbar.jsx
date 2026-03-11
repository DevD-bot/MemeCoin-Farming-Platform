import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, LayoutDashboard, Compass, Send, Book, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'Explore', icon: <Compass size={18} />, path: '/explore' },
    { name: 'Launch', icon: <Send size={18} />, path: '/launch' },
    { name: 'Resources', icon: <Book size={18} />, path: '/docs' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <img src="/favicon.png" alt="MemeFarm Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-black tracking-tighter text-white uppercase tracking-widest hidden md:block">
            Meme<span className="text-cyan-500">Farm</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2 bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
          {navItems.map((item) => (
            <NavItem 
              key={item.name} 
              {...item} 
              isActive={location.pathname === item.path} 
            />
          ))}
        </div>

        <WalletMultiButton className="!bg-cyan-500 hover:!bg-cyan-400 !text-slate-950 !rounded-xl !font-black !text-xs !uppercase !tracking-widest !px-8 !py-3.5 !h-auto transition-all" />
      </div>
    </nav>
  );
};

const NavItem = ({ name, icon, path, isActive }) => (
  <Link 
    to={path} 
    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
      isActive 
        ? 'bg-slate-800 text-cyan-400 border border-white/5 shadow-inner' 
        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
    }`}
  >
    {icon}
    <span>{name}</span>
  </Link>
);

export default Navbar;
