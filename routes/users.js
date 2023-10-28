const usersRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, getMe,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
