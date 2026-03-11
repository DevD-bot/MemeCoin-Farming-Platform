import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Info, Upload, CheckCircle2, Megaphone, Users, Zap, Shield } from 'lucide-react';
import axios from 'axios';

const Launch = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '1000000000',
    description: '',
    buyTax: '0',
    sellTax: '0',
    liquidityPercent: '80',
    chain: 'Solana'
  });

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInspiration = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dex/boosts/latest');
        setAds(response.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch inspiration:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInspiration();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const chains = [
    { name: 'Solana', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    { name: 'BSC', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
    { name: 'Base', icon: 'https://avatars.githubusercontent.com/u/108554348?s=200&v=4' },
    { name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' }
  ];

  return (
    <div className="pt-40 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: Input Form */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 rounded-[2.5rem] border-white/5"
          >
            <div className="flex items-center gap-6 mb-16">
              <div className="p-5 bg-slate-800 rounded-2xl border border-white/5">
                <Rocket className="text-cyan-400 w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight">Launch <span className="text-gradient">Engine</span></h1>
                <p className="text-slate-400 font-medium">Deploy institutional-grade meme assets on-chain instantly.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Asset Parameters</label>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Token Specification Name"
                      className="w-full glass border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-cyan-500/30 transition-all font-bold text-sm text-white placeholder:text-slate-600"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="text" 
                      name="symbol"
                      placeholder="Ticker Matrix (e.g. GIGA)"
                      className="w-full glass border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-cyan-500/30 transition-all font-bold text-sm text-white placeholder:text-slate-600"
                      value={formData.symbol}
                      onChange={handleInputChange}
                    />
                    <textarea 
                      name="description"
                      placeholder="Mission statement and utility description..."
                      rows="4"
                      className="w-full glass border border-white/5 rounded-xl px-6 py-4 outline-none focus:border-cyan-500/30 transition-all font-bold text-sm text-white placeholder:text-slate-600"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Network Selection</label>
                  <div className="grid grid-cols-2 gap-4">
                    {chains.map(chain => (
                      <div 
                        key={chain.name}
                        onClick={() => setFormData(prev => ({ ...prev, chain: chain.name }))}
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition-all ${
                          formData.chain === chain.name ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-white/5 border-white/5 hover:bg-white/10'
                        }`}
                      >
                        <img src={chain.icon} alt={chain.name} className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
                        <span className={`text-xs font-bold ${formData.chain === chain.name ? 'text-white' : 'text-slate-500'}`}>{chain.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 mb-4 uppercase tracking-[0.2em]">Tokenomic Controls (%)</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Entry Fee</span>
                      <input 
                        type="number" 
                        name="buyTax"
                        className="w-full glass border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-cyan-500/30 text-white font-bold"
                        value={formData.buyTax}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Exit Fee</span>
                      <input 
                        type="number" 
                        name="sellTax"
                        className="w-full glass border border-white/5 rounded-xl px-4 py-4 outline-none focus:border-cyan-500/30 text-white font-bold"
                        value={formData.sellTax}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px]"></div>
                  <div className="flex items-center gap-2 mb-6 text-cyan-400 font-black text-[10px] uppercase tracking-[0.2em]">
                    <Shield size={14} /> Audit Summary
                  </div>
                  <div className="space-y-4 text-xs font-bold">
                    <div className="flex justify-between">
                      <span className="text-slate-500 uppercase tracking-tighter">Emission Cap</span>
                      <span className="text-white font-mono">{Number(formData.supply).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/5 pt-4">
                      <span className="text-slate-500 uppercase tracking-tighter">Gas Estimation</span>
                      <span className="text-cyan-400 font-black">0.5 {formData.chain === 'Solana' ? 'SOL' : 'BNB'}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full btn-premium py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-3">
                  Initialize {formData.symbol || 'Contract'}
                  <CheckCircle2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Inspiration Sidebar */}
        <div className="space-y-8">
          <div className="glass p-10 rounded-[2.5rem] border-white/5 sticky top-40">
            <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
              <Megaphone className="text-cyan-500" size={20} />
              <h2 className="text-xl font-bold text-white tracking-tight">Market Pulse</h2>
            </div>
            
            <div className="space-y-6">
              {loading ? (
                <div className="py-20 text-center text-slate-500 font-bold uppercase tracking-widest text-[10px]">Matrix Syncing...</div>
              ) : (
                ads.map((ad, idx) => (
                  <div key={idx} className="p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all card-hover">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/5">
                        {ad.icon ? <img src={ad.icon} alt="" className="w-full h-full object-cover"/> : <Zap className="text-cyan-500 w-5 h-5"/>}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Active Velocity</p>
                        <p className="font-bold text-xs text-white truncate max-w-[140px] font-mono">{ad.tokenAddress}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-500">Momentum</span>
                      <span className="text-white">#{ad.totalAmount} Index</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-10 p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl">
              <div className="flex items-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-widest mb-3">
                <Users size={14} /> Analytics Tip
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                Sustained growth vectors correlate with 0% entry/exit friction and verified contract matrices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launch;
