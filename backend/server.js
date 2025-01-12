require('dotenv').config(); // Load environment variables
const http = require('http');
const app = require('./src/app'); // Import the app

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
