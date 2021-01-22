const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //For generating ID's

//set the views folder
app.set("views", path.join(__dirname,"views"));

//set the ejs template engine
app.set("view engine", "ejs");

//To parse JSON
app.use(express.json());

//To parse info in request body
app.use(express.urlencoded({extended:true}));

// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))


// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]





app.listen(3000, ()=>{
    console.log("Listening on port 3000...");
});