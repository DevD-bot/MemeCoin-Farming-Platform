import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, LayoutDashboard, Search, Trophy, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg shadow-pink-500/20">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Meme<span className="text-pink-500">Farm</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem to="/launch" icon={<Rocket size={18} />} label="Launch" />
          <NavItem to="/explore" icon={<Search size={18} />} label="Explore" />
          <NavItem to="/leaderboard" icon={<Trophy size={18} />} label="Leaderboard" />
          <NavItem to="/docs" icon={<BookOpen size={18} />} label="Docs" />
        </div>

        <button className="btn-premium px-6 py-2.5 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-all">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link to={to} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group">
    <span className="group-hover:text-pink-500 transition-colors">{icon}</span>
    {label}
  </Link>
);

export default Navbar;
