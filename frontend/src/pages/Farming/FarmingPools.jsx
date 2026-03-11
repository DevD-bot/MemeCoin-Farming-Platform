import React from 'react';
import { motion } from 'framer-motion';
import { Pickaxe, TrendingUp, Droplets, Zap } from 'lucide-react';

const FarmingPools = () => {
  const pools = [
    {
      pair: "PEPE2 / SOL",
      apr: "420.5%",
      tvl: "$1.2M",
      earn: "PEPE2",
      hot: true
    },
    {
      pair: "GIGA / USDC",
      apr: "120.2%",
      tvl: "$450K",
      earn: "GIGA",
      hot: false
    },
    {
      pair: "SOL / USDC",
      apr: "12.5%",
      tvl: "$24.2M",
      earn: "SOL",
      hot: false
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black mb-4">Farming <span className="text-gradient">Pools</span></h1>
          <p className="text-gray-400">Stake your LP tokens and earn high-yield rewards in memecoins.</p>
        </div>
        <div className="p-4 glass rounded-2xl flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Total Value Locked</p>
            <p className="text-xl font-black text-pink-500">$34,240,120</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
            <TrendingUp className="text-pink-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pools.map((pool, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group"
          >
            {pool.hot && (
              <div className="absolute top-6 right-6 px-3 py-1 bg-orange-500/20 text-orange-500 text-[10px] font-black uppercase rounded-full flex items-center gap-1 border border-orange-500/30">
                <Zap size={10} fill="currentColor" /> Hot
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 border-2 border-surface-bg flex items-center justify-center font-bold text-xs">P</div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 border-2 border-surface-bg flex items-center justify-center font-bold text-xs">S</div>
              </div>
              <div>
                <h3 className="text-xl font-bold">{pool.pair}</h3>
                <p className="text-xs text-gray-500 font-medium">Earn {pool.earn}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase mb-1">APR</p>
                <p className="text-2xl font-black text-green-400">{pool.apr}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] text-gray-500 uppercase mb-1">TVL</p>
                <p className="text-2xl font-black text-white">{pool.tvl}</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full btn-premium py-4 rounded-2xl font-black text-sm shadow-lg shadow-pink-500/10">
                Stake LP
              </button>
              <div className="flex gap-2">
                <button className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold text-sm transition-all">
                  Harvest
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 py-3 rounded-xl font-bold text-sm transition-all text-gray-400">
                  Unstake
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FarmingPools;
