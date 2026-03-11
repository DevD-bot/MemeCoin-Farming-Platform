import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const TrendingCoins = () => {
  const coins = [
    {
      logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
      name: "Pepe 2.0",
      ticker: "PEPE2",
      price: "$0.00000014",
      mcap: "$52.4M",
      holders: "12,400",
      growth: "+140.5%"
    },
    {
      logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
      name: "Gigachad Inu",
      ticker: "GIGA",
      price: "$0.0024",
      mcap: "$12.1M",
      holders: "4,200",
      growth: "+42.2%"
    },
    {
      logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
      name: "Moon Shib",
      ticker: "MSHIB",
      price: "$0.000012",
      mcap: "$8.7M",
      holders: "8,100",
      growth: "+15.8%"
    }
  ];

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Trending Memecoins</h2>
            <p className="text-gray-400">The most discussed and traded tokens in the last 24 hours.</p>
          </div>
          <button className="text-pink-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Coins <TrendingUp size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coins.map((coin, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden group"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 blur-[50px] -z-10 group-hover:bg-pink-500/20 transition-all"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <img src={coin.logo} alt={coin.name} className="w-16 h-16 rounded-2xl shadow-lg border border-white/10" />
                <div>
                  <h3 className="text-xl font-bold">{coin.name}</h3>
                  <span className="text-xs font-mono text-pink-500 bg-pink-500/10 px-2 py-0.5 rounded-md">{coin.ticker}</span>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-green-400 font-black">{coin.growth}</div>
                  <div className="text-xs text-gray-500">24h Change</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <DollarSign size={12} /> Market Cap
                  </div>
                  <div className="font-bold">{coin.mcap}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <div className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <Users size={12} /> Holders
                  </div>
                  <div className="font-bold">{coin.holders}</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-lg font-black">{coin.price}</div>
                <button className="flex-1 btn-premium py-3 rounded-xl font-bold text-sm">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingCoins;
