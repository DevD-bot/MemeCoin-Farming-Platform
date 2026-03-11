import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, BarChart3, Users } from 'lucide-react';

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState('Trending');

  const filters = ['Trending', 'New', 'Most Traded', 'Highest Cap'];

  const coins = [
    {
      logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
      name: "Pepe 2.0",
      ticker: "PEPE2",
      price: "$0.00000014",
      mcap: "$52.4M",
      liquidity: "$4.1M",
      holders: "12,400",
      growth: "+140.5%",
      tags: ["Meme", "PEPE"]
    },
    {
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
      name: "Solana Inu",
      ticker: "SOLINU",
      price: "$0.0042",
      mcap: "$8.2M",
      liquidity: "$1.2M",
      holders: "3,100",
      growth: "-5.2%",
      tags: ["Solana", "AI"]
    },
    {
      logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
      name: "Gigachad Inu",
      ticker: "GIGA",
      price: "$0.0024",
      mcap: "$12.1M",
      liquidity: "$2.5M",
      holders: "4,200",
      growth: "+42.2%",
      tags: ["Meme", "Giga"]
    },
    {
      logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
      name: "Moon Shib",
      ticker: "MSHIB",
      price: "$0.000012",
      mcap: "$8.7M",
      liquidity: "$900K",
      holders: "8,100",
      growth: "+15.8%",
      tags: ["Meme"]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black mb-4">Explore <span className="text-gradient">Coins</span></h1>
          <p className="text-gray-400">Discover the next gem before it moons.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or ticker..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-pink-500/50 transition-all"
            />
          </div>
          <button className="glass px-6 py-4 rounded-2xl flex items-center gap-2 font-bold hover:bg-white/10 transition-all border-white/5 whitespace-nowrap">
            <Filter size={20} /> Filters
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              activeFilter === filter 
                ? 'bg-pink-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {coins.map((coin, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass p-6 rounded-[2rem] border-white/5 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={coin.logo} alt={coin.name} className="w-12 h-12 rounded-xl shadow-lg" />
              <div>
                <h3 className="font-bold leading-none mb-1 group-hover:text-pink-500 transition-colors">{coin.name}</h3>
                <span className="text-[10px] font-mono text-gray-500 uppercase">{coin.ticker}</span>
              </div>
              <div className={`ml-auto text-xs font-black ${coin.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {coin.growth}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <StatRow label="Price" value={coin.price} />
              <StatRow label="Market Cap" value={coin.mcap} />
              <StatRow label="Liquidity" value={coin.liquidity} />
            </div>

            <div className="flex gap-2 mb-6">
              {coin.tags.map(tag => (
                <span key={tag} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-400">{tag}</span>
              ))}
            </div>

            <button className="w-full bg-white/5 hover:bg-pink-500 transition-all py-3 rounded-xl font-bold text-sm">
              View Details
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const StatRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-gray-500">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

export default Explore;
