const express = require('express')
const app = express();

const db= require('./config/db');
const passport=require('./routes/auth')
const router = express.Router();
require('dotenv').config();
const AnimeRoutes = require('./routes/animeRoutes');

const bodyParser = require('body-parser');
app.use(bodyParser.json());



// middleware
const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to :${req.originalUrl}`);
    next()
  }



app.use(logRequest)

app.use(passport.initialize())
const localAuth=passport.authenticate('local',{session:false});

app.use('/Anime',AnimeRoutes);

app.get('/',localAuth, function (req, res) {
    res.send('Welcome to my hotel... How i can help you ?, we have list of menus')
})

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})
