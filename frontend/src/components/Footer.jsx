import React from 'react';
import { Rocket, Twitter, MessageCircle, Github, Book } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl shadow-lg shadow-pink-500/20">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Meme<span className="text-pink-500">Farm</span>
            </span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
            The premium memecoin farming platform. Launch, farm, and grow your meme empire with confidence. Powered by Solana.
          </p>
          <div className="flex items-center gap-4">
            <SocialIcon icon={<Twitter size={20} />} href="#" />
            <SocialIcon icon={<MessageCircle size={20} />} href="#" />
            <SocialIcon icon={<Github size={20} />} href="#" />
            <SocialIcon icon={<Book size={20} />} href="#" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition-colors">Explore Coins</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Farming Pools</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Leaderboard</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Tokenomics</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-pink-500 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Security Whitepaper</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Brand Assets</a></li>
            <li><a href="#" className="hover:text-pink-500 transition-colors">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>&copy; 2026 MemeFarm. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className="p-3 bg-white/5 rounded-xl text-gray-400 hover:bg-pink-500/20 hover:text-pink-500 transition-all"
  >
    {icon}
  </a>
);

export default Footer;
