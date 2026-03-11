import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Clock, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingCoins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dex/boosts/latest`);
        const latestBoosts = Array.isArray(response.data) ? response.data.slice(0, 4) : [];
        
        const detailedCoins = await Promise.all(
          latestBoosts.map(async (boost) => {
            try {
              const tokenRes = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dex/tokens/${boost.tokenAddress}`);
              const pair = tokenRes.data.pairs?.[0];
              return {
                ...pair,
                icon: pair?.info?.imageUrl || boost.icon,
                symbol: pair?.baseToken?.symbol || 'UNKNOWN',
                name: pair?.baseToken?.name || 'Unknown Token',
                price: pair?.priceUsd ? `$${parseFloat(pair.priceUsd).toFixed(6)}` : 'N/A',
                change: pair?.priceChange?.h24 || 0,
                address: boost.tokenAddress,
                url: pair?.url || boost.url
              };
            } catch (err) {
              return {
                symbol: 'N/A',
                name: 'Network Error',
                price: 'N/A',
                change: 0,
                icon: boost.icon,
                address: boost.tokenAddress,
                url: boost.url
              };
            }
          })
        );
        setCoins(detailedCoins);
      } catch (error) {
        console.error('Failed to fetch trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
    const interval = setInterval(fetchTrending, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">Live Intelligence Matrix</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Active <span className="text-gradient">Vectors</span></h2>
          </div>
          <Link to="/explore" className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-cyan-400 transition-all">
            Expand Discovery <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="glass h-64 rounded-[2rem] border-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {coins.map((coin, index) => (
                <motion.div
                  key={coin.address + index}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass p-8 rounded-[2.5rem] border-white/5 relative group hover:border-cyan-500/20 transition-all card-hover"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 overflow-hidden group-hover:scale-110 transition-transform">
                      {coin.icon ? (
                        <img src={coin.icon} alt={coin.symbol} className="w-full h-full object-cover" />
                      ) : (
                        <Zap className="text-cyan-500" size={24} />
                      )}
                    </div>
                    <div className={`text-[10px] font-black px-3 py-1 rounded-full border ${Number(coin.change) >= 0 ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' : 'text-rose-400 border-rose-400/20 bg-rose-400/5'}`}>
                      {Number(coin.change) > 0 ? '+' : ''}{coin.change}%
                    </div>
                  </div>

                  <div className="mb-8 overflow-hidden">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors truncate">{coin.name}</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">{coin.symbol}</p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-600 uppercase tracking-tighter">Market Value</p>
                      <p className="font-bold text-slate-200 text-sm">{coin.price}</p>
                    </div>
                    <a 
                      href={coin.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-lg"
                    >
                      <Target size={18} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingCoins;
