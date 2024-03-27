const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

const UserController = {
  getAllUsers: async (req, res, next) => {
    try {
      const { role } = req.body;
      console.log(role);
      let allUsers;

      if (role === 'USER') {
        allUsers = await UserModel.findAll({ where: { isPublic: true } });
      } else {
        allUsers = await UserModel.findAll();
      }
      if (!allUsers) {
        return res.status(404).json({ message: 'No users found' });
      }
      res.status(201).json(allUsers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const email = req.params.id;
      const userById = await UserModel.findByPk(email);
      if (!userById) {
        return res.status(404).json({ message: 'No userById found' });
      }
      res.status(201).json(userById);
    } catch {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const updatedUserData = req.body;
      const user = await UserModel.findByPk(updatedUserData.email);

      if (!user) {
        return res.status(400).json({ message: 'User not existed' });
      }

      if (user.password !== updatedUserData.password) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10,
        );
      }
      const updatedUser = await UserModel.update(updatedUserData, {
        where: { email: updatedUserData.email },
      });
      return res.status(201).json({ message: 'User Updated Successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  uploadPhoto: async (req, res, next) => {
    try {
      const email = req.params.id;
      const { photo } = req.body;

      if (!photo) {
        return res.status(400).json({ message: 'Photo not existed' });
      }

      const uploadPhoto = await UserModel.update(
        { photo: photo },
        { where: { email: email } },
      );

      return res.status(201).json({ message: 'Photo Uploaded Successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = UserController;
