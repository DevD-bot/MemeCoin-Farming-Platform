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
import Resources from './pages/Resources/Resources';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-slate-950">
        <div className="glow-bg" />
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/launch" element={<Launch />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/docs" element={<Resources />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
