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


//Index route (display all comments)
app.get("/comments", (req,res)=>{
    res.render("comments/index", {comments});
});

//Post route from creating new comment form submission
app.post("/comments", (req,res)=>{
    //get new comment info and save on the array
    const id = uuid();
    const { username , comment} = req.body;
    comments.push({id,username,comment});
    res.redirect("/comments");
});

//New comment route (form to create new comment)
app.get("/comments/new", (req,res)=>{
    res.render("comments/new");
});

app.listen(3000, ()=>{
    console.log("Listening on port 3000...");
});