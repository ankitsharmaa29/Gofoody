const express = require("express");
const router = express.Router();
const User = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

router.post("/createUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Display success message and navigate to login page
    res.status(200).json({
      success: true,
      message: "Registration successful",
      // Provide the login page route
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
});

router.post(
  "/loginUser",

  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: "Invalid email",
          message: "Please enter a valid email",
          success: false,
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          error: "Invalid password",
          message: "Please enter the correct password",
          success: false,
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(payload, process.env.jwtsec, { expiresIn: "1h" });

      return res.json({ success: true, token });
    } catch (error) {
      console.error(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
