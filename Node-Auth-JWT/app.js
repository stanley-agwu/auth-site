const express = require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const connectDB=require('./config/db')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');


// Load config
dotenv.config({ path: './config/config.env' })

//db
connectDB();

const app = express();

// Logging with Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// middleware
app.use(express.static('public'));//setting static files
app.use(express.urlencoded({ extended: false }))
app.use(express.json());// JSON Parser
app.use(cookieParser());// cookie parser

// view engine
app.set('view engine', 'ejs');

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/markets', requireAuth, (req, res) => res.render('markets'));
app.use(authRoutes);

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
