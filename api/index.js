import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import {quotes} from "./quotes.js";
import mongoose from "mongoose";
import Quote from "./schema.js";

import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// MongoDB
const  MONGODB_URL = "mongodb+srv://debojyotimongodb:3cKasIN8I9oP7Cdv@cluster0.avboxod.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log("connected to mongodb"))
.catch((err)=>console.log("error connecting mongodb",err));

// Configure session and passport middleware
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Define a sample user for demonstration (replace with your own user database)
const sampleUser = { id: 1, email: 'admin@example.com', password: 'adminpassword' };


// Passport.js local strategy for login
passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      if (email === sampleUser.email && password === sampleUser.password) {
        return done(null, sampleUser);
      } else {
        return done(null, false, { message: 'Invalid credentials' });
      }
    })
  );
  
  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    if (id === sampleUser.id) {
      done(null, sampleUser);
    } else {
      done(null, false);
    }
  });

// Login route
app.post('/Login', passport.authenticate('local'), (req, res) => {
  // Successful login, send a success status
  console.log("sent to db");
  res.sendStatus(200);
});


// routes
// app.get('/',(req,res)=>{
//     res.send("<h1>Home Page</h1>");
// })

app.get('/quotes',async (req,res)=>{
    // const randomIndex = Math.floor(Math.random()*quotes.length);
    // const randomQuote = quotes[randomIndex];
    // res.json({quote: randomQuote});
    try{
        const count = await Quote.countDocuments();
        const randomIndex = Math.floor(Math.random()*count);
        const randomQuote = await Quote.findOne().skip(randomIndex);
        res.json({text: randomQuote.text});
    }
    catch(err){
        console.error("error fetching quote",err);
        res.status(500).json({error: "unable to fetch quote"});
    }
});

app.post('/addQuote',async (req,res)=>{
    try{
        const {text} = req.body;
        if(!text){
            res.status(400).json({error: "Quote text is required"});
        }

        const newQuote = new Quote({text});
        await newQuote.save();

        res.status(201).json({message: "Quote added Successfully"});
    }
    catch(err){
        console.error("error adding quote",err);
        res.status(500).json({error: "Unable to add quote"});
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})