// server.js — This file actually STARTS the server (separated from app.js on purpose)

const app = require('./app');

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});