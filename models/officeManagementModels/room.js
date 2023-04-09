const mongoose = require("mongoose");

const { schema } = require("../secure/roomValidation");

const roomSchema = mongoose.Schema({
  roomNum: {
    type: String,
    enum: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
    ],
    required: true,
  },
  floorNum: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },
  blockNum: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },
});

roomSchema.statics.roomValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("room", roomSchema);
