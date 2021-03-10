const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");

server.get("http://localhost:3001/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});


server.get('http://localhost:3001/github',
  passport.authenticate('github', { scope: [ 'user:email' ],prompt: 'select_account', }));

server.get('http://localhost:3001/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:3001/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const { id, givenName, familyName, email, photoURL, isAdmin } = req.user;

    const token =  jwt.sign(
        {
          id,
          givenName,
          familyName,
          email,
          photoURL,
          isAdmin,
        },
        "secreto")


      res.redirect(`http://localhost:3001/gettokensocial?${token}`)
  });


server.get('http://localhost:3001/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account',
}));

server.get('http://localhost:3001/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3001/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const { id, givenName, familyName, email, photoURL, isAdmin } = req.user;

    const token =  jwt.sign(
        {
          id,
          givenName,
          familyName,
          email,
          photoURL,
          isAdmin,
        },
        "secreto")

      res.redirect(`http://localhost:3001/gettokensocial?${token}`)

  });


function validate(email, password) {
  if (!email || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
    return false;
  }
  if (!password || !/(?=.*[0-9])/.test(password)) {
    return false;
  }
  return true;
}

server.post("http://localhost:3001/register", async function (req, res, next) {
  try {
    if (validate(req.body.email, req.body.password)) {
      const user = await User.create(req.body);
      const { id, givenName, familyName, email, photoURL, isAdmin } = user;
      res.send(
        jwt.sign(
          {
            id,
            givenName,
            familyName,
            email,
            photoURL,
            isAdmin,
          },
          "secreto"
        )
      );
    } else {
      throw new Error("Marquitos");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

server.post("http://localhost:3001/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    if (err) return next(err);
    else if (!user) return res.sendStatus(401);
    else return res.send(jwt.sign(user, "secreto"));
  })(req, res, next);
});

server.post("http://localhost:3001/promote", (req, res) => {
  const { id, isAdmin } = req.body;
  User.findOne({ where: { id } })
    .then((user) => {
      user.isAdmin = isAdmin;
      user.save();
      res.status(200).json({ mensaje: "Se modifico con exito", data: user });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ mensaje: "Los campos enviados no son correctos", data: err });
    });
});

module.exports = server;
