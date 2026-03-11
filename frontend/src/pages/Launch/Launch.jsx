import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Info, Upload, CheckCircle2 } from 'lucide-react';

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

  const [step, setStep] = useState(1);

  const chains = [
    { name: 'Solana', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png' },
    { name: 'BSC', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png' },
    { name: 'Base', icon: 'https://avatars.githubusercontent.com/u/108554348?s=200&v=4' },
    { name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-[3rem] border-pink-500/10"
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-pink-500/10 rounded-2xl">
            <Rocket className="text-pink-500 w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black">Launch Memecoin</h1>
            <p className="text-gray-400">Deploy your token on your favorite chain in seconds.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Form */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Token Details</label>
              <div className="space-y-4">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Token Name (e.g. Gigachad)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-pink-500/50 transition-all"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input 
                  type="text" 
                  name="symbol"
                  placeholder="Symbol (e.g. GIGA)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-pink-500/50 transition-all"
                  value={formData.symbol}
                  onChange={handleInputChange}
                />
                <textarea 
                  name="description"
                  placeholder="Description..."
                  rows="3"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-pink-500/50 transition-all"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Chain Selection</label>
              <div className="grid grid-cols-2 gap-4">
                {chains.map(chain => (
                  <div 
                    key={chain.name}
                    onClick={() => setFormData(prev => ({ ...prev, chain: chain.name }))}
                    className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer border transition-all ${
                      formData.chain === chain.name ? 'bg-pink-500/10 border-pink-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <img src={chain.icon} alt={chain.name} className="w-6 h-6" />
                    <span className="font-bold">{chain.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tokenomics & Preview */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Tokenomics (%)</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs text-gray-500">Buy Tax</span>
                  <input 
                    type="number" 
                    name="buyTax"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-pink-500/50"
                    value={formData.buyTax}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-gray-500">Sell Tax</span>
                  <input 
                    type="number" 
                    name="sellTax"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-pink-500/50"
                    value={formData.sellTax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-pink-500/5 border border-pink-500/10 rounded-[2rem]">
              <div className="flex items-center gap-2 mb-4 text-pink-500 font-bold">
                <Info size={16} /> Summary
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Supply</span>
                  <span className="text-white font-mono">{Number(formData.supply).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Liquidity Allocation</span>
                  <span className="text-white">{formData.liquidityPercent}%</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-3 mt-3">
                  <span className="text-gray-500 font-bold">Estimated Fee</span>
                  <span className="text-pink-500 font-black">0.5 {formData.chain === 'Solana' ? 'SOL' : 'BNB'}</span>
                </div>
              </div>
            </div>

            <button className="w-full btn-premium py-5 rounded-2xl font-black text-xl shadow-xl shadow-pink-500/20 flex items-center justify-center gap-3">
              Launch {formData.symbol || 'Token'}
              <CheckCircle2 size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Launch;
