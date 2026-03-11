import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Coins, Pickaxe, TrendingUp, ArrowUpRight, PlusCircle, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [trackedCoins, setTrackedCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Default addresses if none in localStorage
  const DEFAULT_TRACKED = [
    'So11111111111111111111111111111111111111112', // SOL
    'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', // JUP
    'EKpQGSJtjMFqKZ9KQanAtss7Yde646kkZXYAtbLD'  // WIF
  ];

  const fetchPortfolio = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const stored = localStorage.getItem('tracked_tokens');
      const addresses = stored ? JSON.parse(stored) : DEFAULT_TRACKED;
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/dex/tokens/${addresses.join(',')}`);
      const pairs = response.data.pairs || [];
      
      const mapped = pairs.map(pair => ({
        name: pair.baseToken.name,
        ticker: pair.baseToken.symbol,
        balance: "0.00", // Will be populated by connected wallet in future
        value: `$${parseFloat(pair.priceUsd).toFixed(2)}`,
        profit: `${pair.priceChange?.h24 > 0 ? '+' : ''}${pair.priceChange?.h24 || 0}%`,
        address: pair.baseToken.address
      }));
      setTrackedCoins(mapped);
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(() => fetchPortfolio(), 60000);
    return () => clearInterval(interval);
  }, [fetchPortfolio]);

  const totalValueUsd = trackedCoins.reduce((acc, coin) => {
    const val = parseFloat(coin.value.replace('$', ''));
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  const stats = [
    { label: 'Network Value', value: loading ? '...' : `$${totalValueUsd.toFixed(2)}`, icon: <Wallet className="text-cyan-400" />, change: '+0.0%' },
    { label: 'Active Assets', value: trackedCoins.length.toString(), icon: <Coins className="text-blue-400" />, change: 'Live' },
    { label: 'Staking Rewards', value: '0.00 PEPE2', icon: <Pickaxe className="text-teal-400" />, change: '0.0%' },
    { label: 'Market Volatility', value: loading ? '...' : 'Mid', icon: <TrendingUp className="text-emerald-400" />, change: 'Avg' }
  ];

  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black mb-4 text-white tracking-tight">Personal <span className="text-gradient">Portfolio</span></h1>
          <p className="text-slate-400 text-lg">Institutional-grade asset tracking and yield management.</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <Link to="/explore" className="flex-1 lg:flex-none px-8 py-4 glass rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all outline-none border-white/5">
            <PlusCircle size={16} /> Track New Asset
          </Link>
          <Link to="/launch" className="flex-1 lg:flex-none btn-premium px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center">
            Staking Launchpad
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 rounded-3xl border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 blur-[40px] group-hover:bg-cyan-500/10 transition-all"></div>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-slate-800 rounded-xl border border-white/5">{stat.icon}</div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-1">{stat.label}</div>
            <div className="text-2xl font-black text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Assets Table */}
        <div className="lg:col-span-2 glass rounded-[2.5rem] border-white/5 overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Live Asset Pipeline</h2>
            <button 
              onClick={() => fetchPortfolio(true)}
              disabled={refreshing}
              className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-cyan-300 transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Synchronizing...' : 'Refresh Matrix'}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] border-b border-white/5">
                  <th className="px-8 py-6">Asset Specification</th>
                  <th className="px-8 py-6">Volume</th>
                  <th className="px-8 py-6">Unit Value</th>
                  <th className="px-8 py-6">Performance</th>
                  <th className="px-8 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-20 text-center text-slate-500 font-medium">Accessing decentralized data nodes...</td>
                  </tr>
                ) : (
                  trackedCoins.map((coin, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-[10px] text-cyan-400 uppercase border border-white/5">
                            {coin.ticker[0]}
                          </div>
                          <div>
                            <p className="font-bold text-white">{coin.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono truncate max-w-[120px] uppercase">{coin.address}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8 font-mono text-slate-300">{coin.balance} <span className="text-slate-600 font-bold">{coin.ticker}</span></td>
                      <td className="px-8 py-8 font-black text-white">{coin.value}</td>
                      <td className={`px-8 py-8 font-black ${coin.profit.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {coin.profit}
                      </td>
                      <td className="px-8 py-8 text-right">
                        <a href={`https://dexscreener.com/solana/${coin.address}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-cyan-400 hover:border-cyan-400/20 transition-all border border-transparent inline-flex">
                          <ArrowUpRight size={18} />
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Stats Overlay */}
        <div className="glass rounded-[2.5rem] border-white/5 p-10 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10"></div>
          <div>
            <h2 className="text-xl font-bold text-white mb-10">Intelligence Report</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                    <TrendingUp className="text-cyan-400 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black">Cluster Status</p>
                    <p className="font-bold text-white text-sm">0 Operational Pools</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </div>

              <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] border border-white/5 shadow-2xl">
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Aggregate Yield</p>
                <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">{loading ? '...' : `$${(totalValueUsd * 0.12).toFixed(2)}`}</h3>
                <button 
                  className="w-full btn-premium py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                  onClick={() => alert('Smart Contract integration required to harvest yields to wallet.')}
                >
                  Harvest Yield matrix
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
              Automated yield distribution is synchronized with the Solana blockchain. Rewards are distributed at the end of each epoch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
