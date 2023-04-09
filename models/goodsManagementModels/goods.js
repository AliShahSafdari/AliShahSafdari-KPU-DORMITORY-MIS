const mongoose = require("mongoose");

const {
  schema
} = require("../secure/goodsValidation/goodsValidation");

const goodsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  quantityOfGoods: {
    type: Number,
    default: 0,
  },
  price: {
    type: mongoose.Types.Decimal128,
    default: 0.0,
  },
});

goodsSchema.statics.goodsValidation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};
module.exports = mongoose.model("goods", goodsSchema);