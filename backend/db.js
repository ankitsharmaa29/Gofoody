const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      writeConcern: {
        w: "majority",
      },
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongoDB;
