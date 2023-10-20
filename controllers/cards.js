const CardModel = require('../models/card');

const getCards = (req, res) => CardModel.find()
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(400).send({ message: 'Произошла ошибка на сервере.' }));

const createCard = (req, res) => {
  const cardData = req.body;
  cardData.owner = req.user._id;

  return CardModel.create(cardData)
    .then(
      (card) => res.status(200).send({ data: card }),
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        res.status(500).send({
          message: 'Произошла ошибка на сервере.',
        });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  return CardModel.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ massage: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(200).send(data);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере.' }));
};

const likeCard = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({ massage: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(200).send(data);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере.' }));
};

const dislikeCard = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({ massage: 'Карточка с указанным _id не найдена.' });
      }
      return res.status(200).send(data);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере.' }));
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
