import React from 'react';
import Hero from '../../components/Hero';
import HowItWorks from '../../components/HowItWorks';
import TrendingCoins from '../../components/TrendingCoins';
import MemeFeed from '../../components/MemeFeed';

const Home = () => {
  return (
    <div className="bg-surface-bg">
      <Hero />
      
      <section className="px-6 py-20 bg-black/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <TrendingCoins title="Trending Memes" />
          </div>
          <div className="lg:col-span-1">
            <MemeFeed />
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto glass p-12 rounded-[3rem] border-pink-500/20">
          <h2 className="text-4xl font-black mb-6">Ready to jump in?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Join thousands of farmers already making gains. No registration required, just connect your wallet and start farming.
          </p>
          <button className="btn-premium px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-pink-500/30 hover:scale-105 transition-all">
            Join the Conversation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
