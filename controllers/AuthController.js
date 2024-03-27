const jwt = require('jsonwebtoken');
const config = require('../config/config');
const userModel = require('../models/UserModel');

const authController = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = await user.authenticate(password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, config.auth.secretKey, {
        expiresIn: '24h',
      });

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  loginUserGithub: async (req, res, next) => {},

  signUp: async (req, res, next) => {
    try {
      const userData = req.body;

      if (!userData.email || !userData.password)
        return res
          .status(400)
          .json({ error: 'email and password are required' });

      const userById = await userModel.findByPk(userData.email);

      if (userById) {
        return res.status(400).json({ message: 'User is already exist' });
      }

      const newUser = await userModel.create(userData);
      return res
        .status(201)
        .json({ data: newUser, message: 'User Created Successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  logoutUser: async (req, res) => {
    const token = req.headers.authorization;
    // await res.set('Authorization', '');
    res.setHeader('Authorization', '');
    res.status(200).json({ message: 'Logout successful' });
  },
};

module.exports = authController;
