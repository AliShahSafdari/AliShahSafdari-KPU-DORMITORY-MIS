const mongoose = require("mongoose");

const { schema } = require("./secure/goodsValidation");

const documentSchema = mongoose.Schema({
  docNum: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  docTittle: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  docContent: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  docSummary: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  docDate: {
    type: Date,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
});

module.exports = mongoose.model("document", documentSchema);
