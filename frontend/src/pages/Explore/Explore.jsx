import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, BarChart3, Info, ExternalLink, Zap } from 'lucide-react';
import axios from 'axios';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Trending');

  const filters = ['Trending', 'New', 'Most Traded', 'Highest Cap'];

  const fetchCoins = async (query = 'SOL') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/dex/search?q=${query}`);
      const mappedCoins = (response.data.pairs || []).map(pair => ({
        name: pair.baseToken.name,
        symbol: pair.baseToken.symbol,
        price: `$${parseFloat(pair.priceUsd).toFixed(6)}`,
        change: `${pair.priceChange?.h24 > 0 ? '+' : ''}${pair.priceChange?.h24 || 0}%`,
        marketCap: `$${(pair.fdv || 0).toLocaleString()}`,
        liquidity: `$${(pair.liquidity?.usd || 0).toLocaleString()}`,
        tags: [pair.dexId, pair.chainId],
        image: pair.info?.imageUrl,
        url: pair.url,
        address: pair.baseToken.address,
        createdAt: pair.pairCreatedAt || 0
      }));
      setCoins(mappedCoins);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins('SOL'); 
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchCoins(searchQuery);
    }
  };

  const sortedCoins = [...coins].sort((a, b) => {
    switch (activeFilter) {
      case 'Highest Cap':
        return parseFloat(b.marketCap.replace(/[^0-9.-]+/g,"")) - parseFloat(a.marketCap.replace(/[^0-9.-]+/g,""));
      case 'Most Traded':
        return parseFloat(b.liquidity.replace(/[^0-9.-]+/g,"")) - parseFloat(a.liquidity.replace(/[^0-9.-]+/g,""));
      case 'New':
        // Assuming newest are returned first or simply shuffle/re-query in a real app
        // For now, reverse the array to simulate 'New' sorting
        // we can also sort by a 'pairCreatedAt' timestamp if we add it. Added it below in fetchCoins for robustness.
        return (b.createdAt || 0) - (a.createdAt || 0);
      case 'Trending':
      default:
        // Default API order is usually trending/relevant
        return 0; 
    }
  });

  return (
    <div className="min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-6 text-white tracking-tight"
          >
            Market <span className="text-gradient">Intelligence</span>
          </motion.h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Real-time multi-chain discovery engine. Aggregate data from top DEXs to find the next alpha.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16">
          <form onSubmit={handleSearch} className="flex-1 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search assets by name or contract address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass border border-white/5 rounded-2xl py-6 pl-16 pr-8 focus:outline-none focus:border-cyan-500/30 focus:bg-white/5 transition-all font-bold text-sm tracking-wide text-white placeholder:text-slate-600"
            />
          </form>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-5 rounded-2xl border whitespace-nowrap transition-all font-bold text-xs uppercase tracking-widest ${
                  activeFilter === filter 
                    ? 'bg-cyan-500 border-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/20' 
                    : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Coin Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Querying Global Indices...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {sortedCoins.map((coin, index) => (
                <motion.div
                  key={coin.address + index}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass p-8 rounded-[2rem] border-white/5 relative group hover:border-cyan-500/20 transition-all card-hover"
                >
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center font-black text-cyan-400 text-lg overflow-hidden border border-white/5 group-hover:scale-110 transition-transform">
                      {coin.image ? (
                        <img 
                          src={coin.image} 
                          alt={coin.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { e.target.onerror = null; e.target.src=`https://ui-avatars.com/api/?name=${coin.symbol}&background=0f172a&color=2dd4bf` }}
                        />
                      ) : (
                        <Zap size={24} />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors truncate">{coin.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[10px] uppercase font-black text-cyan-500/50 bg-cyan-500/5 px-2 py-0.5 rounded-md border border-cyan-500/10">
                          {coin.symbol}
                        </span>
                        <span className="text-[10px] uppercase font-black text-slate-600 px-2 py-0.5 rounded-md border border-white/5">
                          {coin.tags[0]}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[10px] text-slate-500 uppercase font-black mb-1 flex items-center gap-1"><TrendingUp size={10}/> Valuation</div>
                      <div className="font-bold text-white">{coin.price}</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-right">
                      <div className="text-[10px] text-slate-500 uppercase font-black mb-1">24h Volatility</div>
                      <div className={`font-bold ${coin.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {coin.change}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 p-6 bg-slate-800/40 rounded-3xl mb-8 border border-white/5">
                    <div>
                      <div className="text-[10px] uppercase font-black text-slate-500 mb-1">FDV</div>
                      <div className="font-bold text-sm text-slate-200">{coin.marketCap}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-black text-slate-500 mb-1">Liquidity</div>
                      <div className="font-bold text-sm text-slate-200">{coin.liquidity}</div>
                    </div>
                  </div>

                  <a 
                    href={coin.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-5 rounded-2xl bg-white/5 border border-white/5 font-bold text-xs uppercase tracking-[0.2em] text-slate-400 flex items-center justify-center gap-2 hover:bg-cyan-500 hover:text-slate-950 transition-all"
                  >
                    View Detail Matrix <ExternalLink size={16} />
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
