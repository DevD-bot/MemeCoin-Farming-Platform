import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Droplets, Wheat, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <PlusCircle className="w-8 h-8 text-pink-500" />,
      title: "Create / Import",
      description: "Launch your own memecoin or import an existing one from Solana."
    },
    {
      icon: <Droplets className="w-8 h-8 text-purple-500" />,
      title: "Add Liquidity",
      description: "Set up liquidity pools to enable trading and farming for your users."
    },
    {
      icon: <Wheat className="w-8 h-8 text-yellow-500" />,
      title: "Start Farming",
      description: "Incentivize holders by setting up high-yield farming pools."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "Track Growth",
      description: "Monitor price, liquidity, and holders with real-time analytics."
    }
  ];

  return (
    <div className="py-24 px-6 bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
          <p className="text-gray-400">Launch and grow your meme empire in 4 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border-white/5 hover:border-pink-500/20 transition-all"
            >
              <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
