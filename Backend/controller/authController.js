const express = require("express");
const User = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const JWT_secret = "hellomylife$code";
const jwt = require("jsonwebtoken");
const fatchuser = require("../middelware/fatchuser");

//rout1:create a user
const Register = router.post(
  "/api/create",
  [
    // Validate request body
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email id").isEmail(),
    body("enrollment", "Enter a valid enrollment id").isLength({ min: 13, max: 13 }),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "This email is already registered." });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: hashedPassword,
        enrollment: req.body.enrollment,
        email: req.body.email,
      });

      // Create JWT token
      const token = jwt.sign({ userId: user._id }, JWT_secret, { expiresIn: '1h' });

      // Respond with the token
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);
//rout2:  user login by, /login
const login = router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("enrollment", "Enter valid enrollment").exists(),
    body("password", "password is require").exists(),
  ],
  async (req, res) => {
    //check the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // match the user email and pass word
    const { email, enrollment, password } = req.body;
    try {
      let user = await User.findOne({ enrollment, email });
      let success = false;
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "please try with correct credentials " });
      }

      const passwordCompare = bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          errors: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_secret);
      // generate the auth token
      success = true;
      return res.send({ success, authtoken });
    } catch (error) {
      //if internal error is availble we throw an error
      console.error(error.message);
      return res.status(500).send("Interanl server error");
    }
  }
);

// rout 3: get loggedin user details using: post "/api/auth/getuser", log in require

const getuser = router.post("/getuser", fatchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
});

module.exports = {
  getuser,
  login,
  Register,
};
