const mongoose = require("mongoose");

const {
  schema
} = require("../secure/goodsValidation/exitsValidation");

const exitsSchema = mongoose.Schema({
  goods_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "goods"
  },
  quantity: {
    type: Number,
    required: true,
    minlength: 1,
  },
  price: {
    type: Number,
  },
  exportDocument_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exportDocuments"
  },
  placeSend: {
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

exitsSchema.statics.exitsValidation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};
module.exports = mongoose.model("exits", exitsSchema);