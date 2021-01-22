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

//Route to show details for a specific comment
app.get("/comments/:id", (req,res)=>{
    const {id} = req.params;
    
    //search in array where the comment object is
    const comment = comments.find(c => c.id===id);

    res.render("comments/show",{comment});
});


//Get route to edit comment
app.get("/comments/:id/edit", (req,res)=>{

    const {id} = req.params;
    
    //search in array where the comment object is
    const comment = comments.find(c => c.id===id);

    res.render("comments/edit", {comment} );
});

//Patch route to edit comment
app.patch("/comments/:id", (req,res)=>{
    //find the comment
    const {id} = req.params;
    
    //search in array where the comment object is
    const comment = comments.find(c => c.id===id);

    comment.comment = req.body.comment;

    res.redirect("/comments");
});

//Route to delete a comment
app.delete("/comments/:id", (req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c=>c.id!==id);
    res.redirect("/comments");
});


app.listen(3000, ()=>{
    console.log("Listening on port 3000...");
});