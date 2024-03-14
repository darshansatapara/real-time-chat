const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const register = router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email, password are required.",
      });
    }

    const hashPassword = await bcrypt.hash(password[0], 10);
    const userId = uuidv4(); // Generate a unique user ID
    const insertUserQuery =
      "INSERT INTO users (username ,email,password) VALUES (?, ?, ?)";
    db.query(insertUserQuery, [name, email, hashPassword], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error." });
      }
      return res
        .status(201)
        .json({ message: "User registered successfully.", userId });
    });
    // res.json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

const login = router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "An error occurred during login" });
        }

        if (result.length === 0) {
          return res.status(404).json({ message: "User not found." });
        }

        const user = result[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res
            .status(401)
            .json({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
          expiresIn: "1h",
        });

        res.status(200).json({ success: true, token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login" });
  }
});
// GET user by ID
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error." });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const user = result[0];
    res.status(200).json(user);
  });
});

module.exports = { login, register };
