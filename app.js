const express = require('express');
const mongoose = require('mongoose');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const appRouter = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const app = express();
app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(appRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  // console.log(`App listening port ${PORT}`);
});
