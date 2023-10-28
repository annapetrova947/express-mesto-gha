const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');

const urlTemplate = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);

usersRouter.get('/:userId', getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(urlTemplate),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
