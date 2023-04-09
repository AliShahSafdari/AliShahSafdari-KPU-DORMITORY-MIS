const mongoose = require("mongoose");

const { stockPurchaseSchema, purchaseInfo, purchaseIngradients } = require("../secure/feedManagement/purchaseValidation");

const purchaseSchema = mongoose.Schema({
  docNumber: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  ingradient: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
    trim: true,
  },
  ingradientType: {
    type: String,
    enum: ["stock", "m-7"],
  },
  // Amount is considered as Kilogram
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    max: 100000,
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    max: 100000000
  },
  totalPrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  date: {
    type: String,
    required: true,
    // default: Date.now,
  },
  from: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 64,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 256,
    trim: true,
  },
  stock_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "stock",
    default: null
  },
  dailyMenu_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dailyMenu",
    default: null
  }
});

purchaseSchema.statics.stockPurchaseValidation = function (body) {
  return stockPurchaseSchema.validate(body, { abortEarly: false });
}

purchaseSchema.statics.purchaseInfoValidation = function (body) {
  return purchaseInfo.validate(body, { abortEarly: false });
}

purchaseSchema.statics.purchaseIngradientsValidation = function (body) {
  return purchaseIngradients.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("purchase", purchaseSchema);