import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const topFarmers = [
    { rank: 1, wallet: "4xPj...9K2m", profit: "$240.5K", coins: "GIGA, PEPE2", badge: "Legendary" },
    { rank: 2, wallet: "7m8s...L1vP", profit: "$182.1K", coins: "SOLINU", badge: "Gold" },
    { rank: 3, wallet: "2qRz...5fGt", profit: "$94.2K", coins: "PEPE2", badge: "Silver" }
  ];

  const topCoins = [
    { rank: 1, name: "Pepe 2.0", symbol: "PEPE2", growth: "+14,200%", volume: "$4.1M" },
    { rank: 2, name: "Gigachad Inu", symbol: "GIGA", growth: "+4,500%", volume: "$1.2M" },
    { rank: 3, name: "Solana Inu", symbol: "SOLINU", growth: "+1,200%", volume: "$900K" }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-block p-4 bg-yellow-500/10 rounded-3xl mb-6">
          <Trophy className="text-yellow-500 w-10 h-10" />
        </div>
        <h1 className="text-5xl font-black mb-4">Meme<span className="text-gradient">Leaderboard</span></h1>
        <p className="text-gray-400">The hall of fame for the most successful farmers and explosive coins.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Top Farmers */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[3rem] border-white/5 overflow-hidden"
        >
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-2">
              <Star className="text-pink-500" /> Top Farmers
            </h2>
          </div>
          <div className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase">
                  <th className="px-4 py-4">Rank</th>
                  <th className="px-4 py-4">Wallet</th>
                  <th className="px-4 py-4">Total Profit</th>
                  <th className="px-4 py-4">Tier</th>
                </tr>
              </thead>
              <tbody>
                {topFarmers.map((farmer, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-all group">
                    <td className="px-4 py-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${
                        farmer.rank === 1 ? 'bg-yellow-500 text-black' :
                        farmer.rank === 2 ? 'bg-gray-400 text-black' :
                        farmer.rank === 3 ? 'bg-orange-400 text-black' : 'bg-white/5 text-gray-500'
                      }`}>
                        {farmer.rank}
                      </div>
                    </td>
                    <td className="px-4 py-6 font-mono text-sm text-gray-300 group-hover:text-white">{farmer.wallet}</td>
                    <td className="px-4 py-6 font-black text-green-400">{farmer.profit}</td>
                    <td className="px-4 py-6">
                      <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-pink-500">
                        {farmer.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Coins */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-[3rem] border-white/5 overflow-hidden"
        >
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-2">
              <TrendingUp className="text-green-500" /> Top Coins
            </h2>
          </div>
          <div className="p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase">
                  <th className="px-4 py-4">Coin</th>
                  <th className="px-4 py-4">Growth</th>
                  <th className="px-4 py-4">Volume</th>
                </tr>
              </thead>
              <tbody>
                {topCoins.map((coin, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-all group">
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 flex items-center justify-center font-black text-pink-500">
                          {coin.symbol[0]}
                        </div>
                        <div>
                          <p className="font-bold">{coin.name}</p>
                          <p className="text-[10px] text-gray-500">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-6 font-black text-green-400">{coin.growth}</td>
                    <td className="px-4 py-6 font-bold">{coin.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
