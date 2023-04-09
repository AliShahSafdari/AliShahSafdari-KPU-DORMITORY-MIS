const mongoose = require("mongoose");

const { schema } = require("../secure/bookValidation");

const bookSchema = mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    trim: true,
  },
  skinNum: {
    type: String,
    required: true,
    trim: true,
  },
  floorNum: {
    type: String,
    required: true,
    trim: true,
  },
  blockNum: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
});

bookSchema.statics.bookValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("book", bookSchema);
