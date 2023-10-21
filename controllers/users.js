const UserModel = require('../models/user');
const Codes = require('../utils/utils');

const createUser = (req, res) => {
  const userData = req.body;

  return UserModel.create(userData)
    .then((user) => res.status(Codes.Created).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(Codes.BadRequest).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      }
      return res.status(Codes.InternalServerError).send({ message: 'Произошла ошибка на сервере.' });
    });
};

const getUsers = (req, res) => {
  UserModel.find()
    .then((data) => res.status(Codes.Ok).send(data))
    .catch(() => res.status(Codes.InternalServerError).send({ message: 'Произошла ошибка на сервере.' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(Codes.NotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(Codes.Ok).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(Codes.BadRequest).send({ message: 'Пользователь не найден' });
      }
      return res.status(Codes.InternalServerError).send({ message: 'Произошла ошибка на сервере.' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;

  return UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((data) => {
      if (!data) {
        return res.status(Codes.NotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(Codes.Ok).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(Codes.BadRequest).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(Codes.InternalServerError).send({ message: 'Произошла ошибка на сервере.' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        return res.status(Codes.NotFound).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.status(Codes.Ok).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(Codes.BadRequest).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(Codes.InternalServerError).send({ message: 'Произошла ошибка на сервере.' });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
};
