require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');
const session       = require('express-session');
const passport      = require('passport');

require('./configs/passport');


mongoose
  .connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@clusterpos-di6hl.mongodb.net/Project-3?retryWrites=true&w=majority`, {useNewUrlParser: true},)
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

//SESSION
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
  })
);


// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//CORS CONECTION TO REACT FRONTEND
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'] // <== this will be the URL of our React app (it will be running on port 3000)
  })
);
//----------------------------Routes-------------------------------------//

//Home
const index = require('./routes/index');
app.use('/', index);

//Products
const productsRoutes = require('./routes/product-routes');
app.use('/api',productsRoutes);

//Authorization
const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

//Checkout
const checkoutRoutes = require('./routes/sales-routes');
app.use('/api', checkoutRoutes);

//Users
const usersRoutes = require('./routes/users-routes');
app.use('/api', usersRoutes);


module.exports = app;
