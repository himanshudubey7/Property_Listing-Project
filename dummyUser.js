const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Adjust the path
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const user = await User.create({
      name: 'Dummy User',
      email: 'dummy@example.com',
      password: 'dummy1234' // make sure password hashing middleware runs
    });
    console.log('Dummy user created with ID:', user._id);
    mongoose.disconnect();
  });
