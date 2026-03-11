const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DEX Screener Proxy Routes
app.get('/api/dex/boosts/latest', async (req, res) => {
  try {
    const response = await axios.get('https://api.dexscreener.com/token-boosts/latest/v1');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest boosts' });
  }
});

app.get('/api/dex/boosts/top', async (req, res) => {
  try {
    const response = await axios.get('https://api.dexscreener.com/token-boosts/top/v1');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top boosts' });
  }
});

app.get('/api/dex/trending', async (req, res) => {
  try {
    const response = await axios.get('https://api.dexscreener.com/token-boosts/top/v1');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending tokens' });
  }
});

app.get('/api/dex/profiles', async (req, res) => {
  try {
    const response = await axios.get('https://api.dexscreener.com/token-profiles/latest/v1');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token profiles' });
  }
});

app.get('/api/dex/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`https://api.dexscreener.com/latest/dex/search/?q=${q}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

app.get('/api/dex/tokens/:addresses', async (req, res) => {
  try {
    const response = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${req.params.addresses}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch token data' });
  }
});

// PumpPortal WebSocket Client
const pumpPortalWs = new WebSocket('wss://pumpportal.fun/api/data');

pumpPortalWs.on('open', function open() {
  console.log('Connected to PumpPortal WebSocket');
  
  // Subscribing to new token creation events
  const payload = {
    method: "subscribeNewToken",
  };
  pumpPortalWs.send(JSON.stringify(payload));
});

pumpPortalWs.on('message', function message(data) {
  const messageData = JSON.parse(data);
  // Stream the news to all connected frontend clients
  io.emit('memeNews', messageData);
  console.log('Breaking Meme News:', messageData);
});

pumpPortalWs.on('error', (err) => {
  console.error('PumpPortal WS Error:', err);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', pumpPortal: 'connected', dexScreener: 'ready' });
});

server.listen(PORT, () => {
  console.log(`MemeFarm Backend running on port ${PORT}`);
});
