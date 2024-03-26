const express = require('express');
const app = express();
const config = require('./config/config');
const sequelize = require('./config/sequelize');
// const models = require('./models');
// const router = require('./routes');
// const cors = require('cors');

// app.use(cors());
app.use(express.json());
// app.use('/api', router);

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
