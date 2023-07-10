const mongoose = require("mongoose");
const category = new mongoose.Schema({
  CategoryName: {
    type: String,
  },
});
module.exports = mongoose.model("foodcategory", category);
