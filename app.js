const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.router');
const pokemonsRouter = require('./routes/pokemons.router');
const regRouter = require('./routes/reg.router');
const profileRouter = require('./routes/profile.router');
const addRouter = require('./routes/add.router');


const app = express();
const { PORT } = process.env;

app.set('view engine', 'hbs');
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));

app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

const sessionConfig = {
  secret: 'Pokemon123',
  resave: false,
  saveUninitialized: false,
  cookie: { expires: 24 * 60 * 60e3 },
  httpOnly: true,
  key: 'userPokCookie',
  store: new FileStore(),
};

app.use(session(sessionConfig));
app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  res.locals.userEmail = req.session?.userEmail;
  res.locals.userName = req.session.userName;
  next();
});

// router
app.use('/', indexRouter);
app.use('/reg', regRouter);
app.use('/profile', profileRouter);
app.use('/pokemons', pokemonsRouter);
app.use('/add', addRouter);

app.listen(PORT, () => console.log(`Vse super connect OK ${PORT}`));
