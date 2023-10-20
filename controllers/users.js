const UserModel = require('../models/user');

const checkLength = (fieldName, minLength, maxLength) => {
  if (fieldName === undefined) {
    return false;
  }
  return fieldName.length < minLength || fieldName.length > maxLength;
};

const createUser = (req, res) => {
  const userData = req.body;

  return UserModel.create(userData)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

const getUsers = (req, res) => {
  UserModel.find()
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере.' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ massage: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  if (checkLength(name, 2, 30) === false || checkLength(about, 2, 30) === false) {
    return res.status(400).send({ message: 'Переданы некорректные данные при обновлении пользователя' });
  }

  return UserModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ massage: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({ massage: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
};
