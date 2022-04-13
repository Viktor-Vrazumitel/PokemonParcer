const router = require('express').Router();
const sha256 = require('sha256');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('regUser');
});

router.post('/', async (req, res) => {
  const { name, email, password: psw } = req.body;
  const password = sha256(psw);
  try {
    const user = await User.create({ name, email, password });
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    res.redirect(`/profile/${user.id}`);
  } catch (error) {
    const message = 'Такой пользователь уже зарегестрировался';
    res.render('error', { error, message });
  }
});

module.exports = router;
