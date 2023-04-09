const students = require("../../models/officeManagementModels/students");
const room = require("../../models/officeManagementModels/room");
const book = require("../../models/officeManagementModels/book");
const { Query } = require("mongoose");

// const paths = room.find({ roomNum: "1", floorNum: "1", blockNum: "1" });
// console.log(paths._id);

let a = Query.prototype.and([{ roomNum: "1" }, { floorNm: "1" }, { blockNum: "1" }])
console.log(a);