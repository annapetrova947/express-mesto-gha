const usersRouter = require('express').Router();
const {
  createUser, getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
