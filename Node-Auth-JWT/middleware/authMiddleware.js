const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;// grabbing token from cookie named jwt

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, '5 stack secret is cool', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

// checking the current user for every new request
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, '5 stack secret is cool', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
            console.log(decodedToken)
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
        }
      });
    } else {
        res.locals.user = null;
        next();
    }
  };

module.exports = { requireAuth, checkUser };