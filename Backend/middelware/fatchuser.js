const jwt = require("jsonwebtoken");
const express = require('express');

const JWT_secret = "hellomylife$code";

const fatchuser = (req, res, next) => {
  //get token from the jwt token  and add id to req join
  const token = req.header('auth-token');

  if (!token) {
    res.status(401).send('please authenticate valid informstion'); 
  }
  try {
    const data = jwt.verify(token, JWT_secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send('please authenticate valid informstion'); 
  }
};

module.exports = fatchuser;