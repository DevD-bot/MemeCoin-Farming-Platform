import React from 'react';
import { motion } from 'framer-motion';
import { Book, Shield, Zap, Cpu, Globe, MessageCircle } from 'lucide-react';

const Resources = () => {
  const resources = [
    {
      title: "Platform Documentation",
      description: "Comprehensive guides on farming, launching tokens, and security protocols.",
      icon: <Book className="text-cyan-400" />,
      link: "#"
    },
    {
      title: "Security Whitepaper",
      description: "Detailed analysis of our rug-proof mechanisms and audit results.",
      icon: <Shield className="text-blue-400" />,
      link: "#"
    },
    {
      title: "API Reference",
      description: "Integrate with our real-time meme discovery engine and analytics.",
      icon: <Cpu className="text-teal-400" />,
      link: "#"
    },
    {
      title: "Brand Assets",
      description: "Official logos, colors, and media kits for community use.",
      icon: <Globe className="text-sky-400" />,
      link: "#"
    }
  ];

  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-5xl font-black mb-6 text-white tracking-tight">
          Platform <span className="text-gradient">Resources</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Access the technical foundations, brand guidelines, and community support required to navigate the MemeCoin Farmer ecosystem.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {resources.map((res, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all card-hover group"
          >
            <div className="flex items-start gap-6">
              <div className="p-4 bg-slate-800 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                {res.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{res.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{res.description}</p>
                <button className="text-cyan-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-cyan-300">
                  Access Resource <Zap size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-12 rounded-[3rem] border-white/5 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10"></div>
        <MessageCircle size={48} className="text-cyan-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Need Support?</h2>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Join our global community of farmers and developers. Get real-time help and share market alpha.
        </p>
        <a 
          href="https://t.me/gigachadtokem" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-block"
        >
          <button className="btn-premium px-12 py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
            Join Official Community
          </button>
        </a>
      </div>
    </div>
  );
};

export default Resources;
