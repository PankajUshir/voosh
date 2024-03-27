const express = require('express');
const app = express();
const config = require('./config/config');
const sequelize = require('./config/sequelize');
const models = require('./models/UserModel');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const router = require('./routes');
const passport = require('./middleware/passport');
const jwt = require('jsonwebtoken');

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./config/swagger-config.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', router);
app.use(
  require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/oauth-callback',
  passport.authenticate('github', { failureRedirect: '/api' }),
  function (req, res) {
    const user = req.user;

    const token = jwt.sign({ user: user }, config.auth.secretKey, {
      expiresIn: '24h',
    });

    res.status(200).json({ token });
  },
);

app.listen(config.port, () => {
  console.log(`Server is listening at http://localhost:${config.port}`);
  sequelize
    .sync()
    .then(() => {
      console.log('database connected !!!');
    })
    .catch((error) => {
      console.log('unable to connect the database : ', error);
    });
});
