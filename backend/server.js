require('dotenv').config(); // Load environment variables
require('./src/models/associations');
const http = require('http');
const app = require('./src/app'); // Import the app
const sequelize = require('./src/sequelize');
const User = require('./src/models/user.model');
const Form = require('./src/models/form.model');
const UsersToForms = require('./src/models/usersToForms.model');
const Submissions = require('./src/models/submissions.model');
const Documents = require('./src/models/documents.model');
const Categories = require('./src/models/categories.model');
const Divisions = require('./src/models/divisions.model');
const {hashPassword} = require('./src/utils/auth.utils')
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);


(async () => {
  const password = await hashPassword('password1234');
  try{
      await sequelize.sync({force: false});
      // await User.create({
      //   user_name: 'Winston',
      //   email: 'dmellowinston@gmail.com',
      //   password: password, // make sure to hash it in a real app!
      //   designation: 'teacher',
      //   role: 'admin',
      //   division: 'Engineering',
      // })
      console.log("All models synchronized successfully");
  }catch(err){
      console.log(err);
      console.log("error during sync");
  }
})();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
