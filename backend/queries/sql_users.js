const { User } = require('../models');
const bcrypt = require('bcrypt');

async function createUser(username, email, password) {
  try {
    const newUser = await User.create({
      Username: username,
      Email: email,
      Password: password
    });

    console.log('User created successfully:', newUser.toJSON());
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
}

async function getUser(username, password) {
  try {
    const user = await User.findOne({ where: { Username: username } });

    if (!user) {
      console.log('User not found');
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (passwordMatch) {
      console.log('User authenticated:', user.toJSON());
      return user; 
    } else {
      console.log('Incorrect password');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user:', error.message);
    throw error;
  }
}

module.exports = getUser;


module.exports = {
  createUser,
  getUser
};