const router = require('express').Router();
const sha256 = require('sha256');
const { User } = require('../db/models');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/login', async (req, res) => {

  const { email, password: psw } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || sha256(psw) !== user.password) {
    const messageLog = 'Вы ввели не верный логин или пароль!';
    return res.render('errorLog', { messageLog });
  }
  req.session.userId = user.id;
  req.session.userEmail = user.email;
  req.session.userName = user.name;
  res.redirect('/');
});

module.exports = router;
