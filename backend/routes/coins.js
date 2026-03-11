const express = require('express');
const router = express.Router();

// Mock Data
const coins = [
  {
    id: 1,
    logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    name: "Pepe 2.0",
    ticker: "PEPE2",
    price: "$0.00000014",
    mcap: "$52.4M",
    liquidity: "$4.1M",
    holders: "12,400",
    growth: "+140.5%",
    trending: true
  },
  {
    id: 2,
    logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
    name: "Solana Inu",
    ticker: "SOLINU",
    price: "$0.0042",
    mcap: "$8.2M",
    liquidity: "$1.2M",
    holders: "3,100",
    growth: "-5.2%",
    trending: false
  }
];

// Get all coins
router.get('/', (req, res) => {
  res.json(coins);
});

// Get trending coins
router.get('/trending', (req, res) => {
  const trending = coins.filter(c => c.trending);
  res.json(trending);
});

// Get coin details
router.get('/:id', (req, res) => {
  const coin = coins.find(c => c.id === parseInt(req.params.id));
  if (!coin) return res.status(404).json({ message: 'Coin not found' });
  res.json(coin);
});

module.exports = router;
