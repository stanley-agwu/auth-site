const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());// JSON Parser
app.use(cookieParser());// cookie parser


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://<username>:<password>@cluster0.7cn1t.mongodb.net/<dbname>';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/markets', requireAuth, (req, res) => res.render('markets'));
app.use(authRoutes);




