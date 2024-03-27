const DataTypes = require('sequelize');
const sequelize = require('../config/sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('ADMIN', 'USER'),
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(10),
      allowNull: false,
      len: {
        args: [10, 10],
        msg: 'Mobile number must be exactly 10 characters long',
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: {
          args: true,
          msg: 'Photo must be a valid URL',
        },
      },
    },

    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Default value is true
    },
  },
  { tableName: 'users', timestamps: false },
);

const beforeCreateHook = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
};

User.addHook('beforeCreate', beforeCreateHook);

User.prototype.authenticate = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;
