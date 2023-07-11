const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const mongoURI =
  "mongodb+srv://goswamirounak03:8697rounak@cluster0.nvtnbgx.mongodb.net/go-foody-app-reactjs";

const mongoDB = async () => {
  await mongoose.connect(mongoURI, (err, data) => {
    if (err) console.log(`--- ${err}`);
    else {
      console.log("Connected");
      const fetched_data = mongoose.connection.db.collection("food_items");
      fetched_data.find({}).toArray(async (err, data) => {
        const food_category = await mongoose.connection.db.collection(
          "food_category"
        );
        food_category.find({}).toArray((err, categoryData) => {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.food_category = categoryData;
          }
        });
        // if (err) console.log(err);
        // else {
        //   global.food_items = data;
        // }
      });
    }
  });
};

module.exports = mongoDB;
