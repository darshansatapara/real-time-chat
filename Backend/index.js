const connectToMongo= require('./db/db');
const { query } = require('express-validator');
const express = require('express')
const app = express();
const { login, Register } = require("./controller/authController");
var cors =require('cors');
app.use(cors());

app.use(express.json())

connectToMongo();

const authRoute = require("./controller/authController")

const port = 5000;

app.use("/api", authRoute);


app.listen(port, () => {
  console.log(`inotoodo back-end listening on port http://localhost:${port}`)
})