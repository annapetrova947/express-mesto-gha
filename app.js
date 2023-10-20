const express = require('express');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');
const appRouter = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '65309e665e92b72b96afdd1d',
  };

  next();
});

app.use(appRouter);

app.listen(PORT, () => {
  // console.log(`App listening port ${PORT}`);
});
