const mongoose = require("mongoose");

const {
  schema
} = require("../secure/goodsValidation/entryDocumentValidation");

const entryDocSchema = mongoose.Schema({
  summary: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  from: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  to: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  docNum: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },
  docDate: {
    type: String,
    maxlength: 15,
  },
  docEntryDate: {
    type: String,
    maxlength: 50,
  },
  considration: {
    type: String,
    maxlength: 255,
  },
  registerBook_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookRegisters"
  },
});
entryDocSchema.statics.entryDocumentValidation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};
module.exports = mongoose.model("entryDocuments", entryDocSchema);