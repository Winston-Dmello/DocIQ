require('dotenv').config(); // Load environment variables
const http = require('http');
const app = require('./src/app'); // Import the app
const sequelize = require('./src/sequelize');
const Form = require('./src/models/form.model');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

(async () => {
  try{
      await sequelize.sync({force: false});
      console.log("All models synchronized successfully");
  }catch(err){
      console.log(err)
      console.log("error during sync")
  }
})();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
