const express = require('express');
const cors = require('cors');
const register = require('./components/register');
const login = require('./components/login');
const update = require('./components/update');
const auth = require('./components/auth');
const getUser = require('./components/user');
const list = require('./components/pagination');
const deleteUser = require('./components/delete');
const logger = require('./components/logger');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { nickname, firstName, lastName, password } = req.body;
  if (!nickname || !password) {
    return res.sendStatus(400);
  }

  const profile = await register(nickname, firstName, lastName, password);

  if (profile) {
    res.send(profile);
  } else {
    res.sendStatus(400);
  }
});

app.post('/login', async (req, res) => {
  const { nickname, password } = req.body;
  if (!nickname || !password) {
    return res.sendStatus(400);
  }
  const profile = await login(nickname, password);
  if (profile) {
    res.send(profile);
  } else {
    res.sendStatus(400);
  }
});

app.post('/update', auth, async (req, res) => {
  const { nickname, firstName, lastName, password } = req.body;
  const profile = await update(
    nickname,
    firstName,
    lastName,
    password,
    req.headers['if-unmodified-since']
  );
  if (profile) {
    res.header('Last-Modified', new Date());
    res.send(profile);
  } else {
    res.sendStatus(400);
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

app.delete('/:nickname', async (req, res) => {
  const { nickname } = req.params;
  logger.info(nickname);

  if (!nickname) {
    return res.sendStatus(400);
  }
  const userProfile = await deleteUser(nickname);
  logger.info(userProfile);

  if (userProfile === false) {
    return res.sendStatus(400);
  }
  res.status(400).send('deleted');
});

module.exports = app;
