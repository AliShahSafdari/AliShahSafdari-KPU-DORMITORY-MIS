const mongoose = require("mongoose");

const {
  schema
} = require("../secure/goodsValidation/entriesValidation");

const entriesSchema = mongoose.Schema({

  goods_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "goods"
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  entryDocument_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "entryDocuments"
  },
  placeFromRecieved: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  dates: {
    type: String,
    maxlength: 15,
  },
  registerBook_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookRegisters"
  },
  considration: {
    type: String,
    maxlength: 255,
  }
});
entriesSchema.statics.entriesValidation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};

module.exports = mongoose.model("entries", entriesSchema);