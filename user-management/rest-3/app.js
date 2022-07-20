require('dotenv').config();
const express = require('express');
const cors = require('cors');
const register = require('./components/register');
const login = require('./components/login');
const update = require('./components/update');
const getUser = require('./components/user');
const list = require('./components/pagination');
const deleteUser = require('./components/delete');
const authenticateToken = require('./api/middleware/authToken');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { nickname, firstName, lastName, password, role } = req.body;
  if (!nickname || !password) {
    return res.sendStatus(400);
  }

  const profile = await register(nickname, firstName, lastName, password, role);

  if (profile) {
    res.send(profile);
  } else {
    res.sendStatus(400);
  }
});

app.post('/login', async (req, res) => {
  const { nickname, password } = req.body;
  const profile = await login(nickname, password);
  const role = profile.role;
  const accessToken = jwt.sign(
    { name: nickname, role: role },
    process.env.ACCESS_TOKEN_SECRET
  );
  if (!nickname || !password) {
    return res.sendStatus(400);
  }
  if (profile) {
    res.send({ accessToken: accessToken });
  } else {
    res.sendStatus(400);
  }
});

app.put('/:nickname', authenticateToken, async (req, res) => {
  const { firstName, lastName, password, role } = req.body;
  const { nickname } = req.params;
  if (
    (req.user.name !== nickname || req.user.name === nickname) &&
    req.user.role === 'admin'
  ) {
    const profile = await update(
      nickname,
      firstName,
      lastName,
      password,
      role,
      req.headers['if-unmodified-since']
    );
    if (profile) {
      res.header('Last-Modified', new Date());
      res.send(profile);
    }
  } else {
    res.status(401).send('You have not permission');
  }
});

app.get('/list', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const lists = await list(page, limit);
  res.send(lists);
});

app.get('/:nickname', async (req, res) => {
  const { nickname } = req.params;

  const userProfile = await getUser(nickname);
  if (userProfile) {
    res.send(userProfile);
  } else {
    res.sendStatus(400);
  }
});

app.delete('/:nickname', authenticateToken, async (req, res) => {
  const { nickname } = req.params;
  if (
    (req.user.name !== nickname || req.user.name === nickname) &&
    req.user.role === 'admin'
  ) {
    const userProfile = await deleteUser(nickname);
    if (userProfile === false) {
      return res.sendStatus(400);
    } else {
      res.status(400).send('deleted');
    }
  } else {
    res.status(401).send('You have not permission');
  }

  if (!nickname) {
    return res.sendStatus(400);
  }
});

module.exports = app;
