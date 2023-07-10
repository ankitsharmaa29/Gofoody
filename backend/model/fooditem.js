const mongoose = require("mongoose");
const fooditem = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
  name: {
    type: String,
  },
  img: {
    type: String,
  },
  options: [{}],
  description: String,
});
module.exports = mongoose.model("fooditem", fooditem);
