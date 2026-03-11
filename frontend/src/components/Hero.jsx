import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-sm font-bold tracking-wider uppercase mb-6 inline-block">
              The Evolution of Memecoins
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Farm the Next <br />
              <span className="text-gradient">1000x</span> Memecoin
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto md:mx-0">
              The ultimate platform to launch, farm, and track the most explosive memecoins on Solana. Direct liquidity, no rugs, pure gains.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button className="btn-premium px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-pink-500/20 flex items-center gap-2 w-full sm:w-auto">
                <Rocket className="w-5 h-5" />
                Launch Coin
              </button>
              <button className="px-8 py-4 rounded-2xl font-black text-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all w-full sm:w-auto">
                Explore Coins
              </button>
            </div>
          </motion.div>

          <div className="mt-12 flex flex-wrap items-center gap-8 justify-center md:justify-start opacity-60">
            <StatItem icon={<TrendingUp size={20} />} label="Total Volume" value="$24.2M" />
            <StatItem icon={<ShieldCheck size={20} />} label="Security" value="Rug-Proof" />
          </div>
        </div>

        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <img 
              src="https://img.freepik.com/free-vector/gradient-liquid-shapes-background_23-2148937989.jpg" 
              alt="Meme character growing" 
              className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-purple-500/20"
            />
            {/* Overlay cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-10 -right-10 glass p-6 rounded-2xl border-pink-500/30"
            >
              <div className="text-pink-500 font-black text-xl">+1,240%</div>
              <div className="text-xs text-gray-400">Trending: $PEPE 2.0</div>
            </motion.div>
          </motion.div>
          
          {/* Background circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <div className="text-pink-500">{icon}</div>
    <div>
      <div className="text-xs text-gray-400 uppercase tracking-tighter">{label}</div>
      <div className="text-white font-bold">{value}</div>
    </div>
  </div>
);

export default Hero;
