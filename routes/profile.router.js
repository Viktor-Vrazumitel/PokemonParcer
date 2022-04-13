const router = require('express').Router();
const { checkUser, deepCheckUser } = require('../middleware/allMiddleware');
const { Card } = require('../db/models');

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('userPokCookie');
  res.redirect('/');
});

router.get('/:id', checkUser, deepCheckUser, async (req, res) => {
  const card = await Card.findAll({ where: { user_id: req.session.userId } });

  res.render('profile', { card });
});

router.post('/delete/:id', async (req, res) => {
  try {
    await Card.destroy({ where: req.params });

    return res.redirect(`/profile/${req.session.userId}`);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
