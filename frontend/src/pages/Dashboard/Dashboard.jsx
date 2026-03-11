import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, Pickaxe, TrendingUp, ArrowUpRight, PlusCircle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Wallet Balance', value: '14.5 SOL', icon: <Wallet className="text-pink-500" />, change: '+2.4%' },
    { label: 'Tokens Owned', value: '12', icon: <Coins className="text-purple-500" />, change: 'Stable' },
    { label: 'Farming Rewards', value: '1.2M PEPE2', icon: <Pickaxe className="text-yellow-500" />, change: '+12%' },
    { label: 'Total ROI', value: '+420%', icon: <TrendingUp className="text-green-500" />, change: '+5.1%' }
  ];

  const myCoins = [
    { name: 'Pepe 2.0', ticker: 'PEPE2', balance: '1.2M', value: '$168.00', profit: '+$42.00' },
    { name: 'Gigachad Inu', ticker: 'GIGA', balance: '4,500', value: '$10.80', profit: '-$2.10' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black mb-4">My <span className="text-gradient">Dashboard</span></h1>
          <p className="text-gray-400">Manage your assets, track farming rewards, and monitor growth.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-4 glass rounded-2xl font-bold flex items-center gap-2 hover:bg-white/5 transition-all">
            <PlusCircle size={20} /> Add Liquidity
          </button>
          <button className="btn-premium px-8 py-4 rounded-2xl font-black shadow-lg shadow-pink-500/20">
            Launch New Coin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-3xl border-white/5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-xl">{stat.icon}</div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-2xl font-black">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assets Table */}
        <div className="lg:col-span-2 glass rounded-[2.5rem] border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold">My Meme Coins</h2>
            <button className="text-pink-500 text-sm font-bold">View History</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-500 uppercase border-b border-white/5">
                  <th className="px-8 py-4">Asset</th>
                  <th className="px-8 py-4">Balance</th>
                  <th className="px-8 py-4">Value</th>
                  <th className="px-8 py-4">Profit/Loss</th>
                  <th className="px-8 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {myCoins.map((coin, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center font-black text-[10px] text-pink-500">
                          {coin.ticker[0]}
                        </div>
                        <div>
                          <p className="font-bold">{coin.name}</p>
                          <p className="text-[10px] text-gray-500">{coin.ticker}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-mono font-medium">{coin.balance}</td>
                    <td className="px-8 py-6 font-bold">{coin.value}</td>
                    <td className={`px-8 py-6 font-bold ${coin.profit.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.profit}
                    </td>
                    <td className="px-8 py-6">
                      <button className="p-2 hover:bg-pink-500/10 rounded-lg text-gray-500 hover:text-pink-500 transition-all">
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Farming Summary */}
        <div className="glass rounded-[2.5rem] border-white/5 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] -z-10"></div>
          <h2 className="text-xl font-bold mb-8">Farming Activity</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <TrendingUp className="text-pink-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Pools</p>
                  <p className="font-bold">3 Pools</p>
                </div>
              </div>
              <button className="text-xs font-bold text-pink-500">Manage</button>
            </div>

            <div className="p-6 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-3xl border border-pink-500/20">
              <p className="text-xs text-gray-400 uppercase tracking-tighter mb-1">Total Rewards Earned</p>
              <h3 className="text-3xl font-black mb-4">$4,280.50</h3>
              <button className="w-full btn-premium py-3 rounded-xl font-bold text-sm">
                Harvest All
              </button>
            </div>
            
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Auto-harvesting is enabled for GIGA pools. Rewards are distributed every 6 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
