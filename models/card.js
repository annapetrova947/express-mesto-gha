// name — имя карточки, строка от 2 до 30 символов, обязательное поле;
// link — ссылка на картинку, строка, обязательно поле.
// owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
// likes — список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
// createdAt — дата создания, тип Date, значение по умолчанию Date.now.

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
});
