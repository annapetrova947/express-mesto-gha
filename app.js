const express = require('express');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');
const UserModel = require('./models/user');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.post('/users', (req, res) => {
  const userData = req.body;
  console.log(req.body);

  return UserModel.create(userData)
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
});

app.listen(PORT, () => {
  // console.log(`App listening port ${PORT}`);
});
