const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionStore = new SequelizeStore({ db: sequelize });
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const homepageRoute = require('./controllers/homepage-route');
const dashboardRoute = require('./controllers/api/dashboard-route');
const loginRoute = require('./controllers/api/login-route');
const logoutRoute = require('./controllers/api/logout-route');
const createPostRoute = require('./controllers/api/creatPost-route');

app.use('/', homepageRoute);
app.use('/dashboard', dashboardRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/create-post', createPostRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});