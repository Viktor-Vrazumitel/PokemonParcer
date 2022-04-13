const checkUser = (req, res, next) => {
  if (req.session.userName) {
    next();
  } else {
    res.redirect('/');
  }
};

const deepCheckUser = (req, res, next) => {
  if (req.session.userId === Number(req.params.id)) {
    next();
  } else {
    res.redirect(`/profile/${req.session.userId}`);
  }
};

module.exports = { checkUser, deepCheckUser };
