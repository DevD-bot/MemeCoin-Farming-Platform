import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import Launch from './pages/Launch/Launch';
import Explore from './pages/Explore/Explore';
import Dashboard from './pages/Dashboard/Dashboard';
import FarmingPools from './pages/Farming/FarmingPools';
import Leaderboard from './pages/Leaderboard/Leaderboard';

// Placeholder Pages
const Docs = () => <PagePlaceholder title="Documentation" />;

const PagePlaceholder = ({ title }) => (
  <div className="pt-32 pb-20 px-6 min-h-[70vh] flex items-center justify-center">
    <div className="glass p-12 rounded-[3rem] border-white/5 text-center max-w-lg w-full">
      <h2 className="text-4xl font-black mb-4">{title}</h2>
      <p className="text-gray-400">This feature is currently under development. Stay tuned for the 1000x gains!</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="glow-bg" />
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/launch" element={<Launch />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
