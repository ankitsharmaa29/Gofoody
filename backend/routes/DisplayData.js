const express = require("express");
const router = express.Router();
const food = require("../model/fooditem");
const category = require("../model/foodcategory");
router.post("/foodData", async (req, res) => {
  try {
    global.fooditem = await food.find({});
    global.catFood = await category.find({});

    res.send([global.fooditem, global.catFood]);
  } catch (error) {
    res.status(400).json({ message: "error occured while fatching data" });
  }
});
module.exports = router;
