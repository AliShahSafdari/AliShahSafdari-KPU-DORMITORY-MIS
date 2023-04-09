const mongoose = require("mongoose");

// const { schema } = require("../secure/feedManagement/menuValidation");
const editMenuSchema = require("../secure/feedManagement/editMenuValidation");

const menuSchema = mongoose.Schema({
  menuType: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 8,
  },
  ingradient: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
    trim: true
  },
  // totalAmount: {
  //   type: mongoose.Schema.Types.Decimal128,
  //   required: true,
  // },
  // Gram
  morningIngradientAmount: {
    type: mongoose.Schema.Types.Decimal128,
    // required: true,
    min: 0,
    max: 1000,
    default: 0.00
  },
  noonIngradientAmount: {
    type: mongoose.Schema.Types.Decimal128,
    // required: true,
    min: 0,
    max: 1000,
    default: 0.00
  },
  nightIngradientAmount: {
    type: mongoose.Schema.Types.Decimal128,
    // required: true,
    min: 0,
    max: 1000,
    default: 0.00
  },
  calory: {
    type: mongoose.Schema.Types.Decimal128,
    min: 0,
    max: 10000,
    default: 0.00
  },
  // date: {
  //   type: String,
  //   required: true,
  // default: Date.now,
  // },
  // description: {
  //   type: String,
  //   required: true,
  //   minlength: 1,
  //   maxlength: 256,
  // },
  stock_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stock",
    default: null
  }
});

// menuSchema.statics.menuValidation = function (temp) {
//   return schema.validate(temp, { abortEarly: false });
// }

menuSchema.statics.menuValidation = function (temp) {
  return editMenuSchema.schema.validate(temp, { abortEarly: false });
}

module.exports = mongoose.model("menu", menuSchema);
