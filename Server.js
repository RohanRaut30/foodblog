const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

const app = express();
require("./server/database/conn");
const Register = require("./server/models/registers");

// Using environment variable PORT or defaulting to 3000
const port = process.env.PORT || 3000;
const path = require('path');

// Middleware setup
app.use(express.static('public'));
//Production 
app.get("*", (req, res)=> {
   res.sendFile(path.resolve(__dirname,"public","index.html"))
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => { 
   res.render("SignUp_Page");
});

app.get("/login", (req, res) => {
   res.render("Login_Page");
});

app.get("/register", (req, res) => {
   res.render("SignUp_Page");
});

// SignUp code
app.post("/sign_up", async (req, res) => {
   try {
      const { name, email, password, ConfirmPassword } = req.body;
      
      if (password === ConfirmPassword) {
         const registerusers = new Register({
            name,
            email,
            password,
            ConfirmPassword
         });

         const registered = await registerusers.save();
         res.status(201).sendFile(__dirname + '/public/Login_Page.html');
      } else {
         res.send("Invalid Password");
      }
   } catch (error) {
      res.status(400).send(error.message);
   }
});

//login 
app.post("/login", async (req, res) => {
   try {
       const email = req.body.email;
       const password = req.body.password;

       // Check if the email exists in the database
       const user = await Register.findOne({ email: email });

       if (!user) {
           return res.status(400).send("Invalid Email or Password");
       }

       // Compare the provided password with the hashed password in the database
       const isMatch = await bcrypt.compare(password, user.password);

       if (isMatch) {
           // Passwords match, redirect to a profile page or send a success response
           return res.status(200).sendFile(__dirname + '/public/index.html');
       } else {
           // Passwords don't match, send an error response
           return res.status(400).send("Invalid Password");
       }
   } catch (error) {
       // Handle any unexpected errors
       console.error(error);
       res.status(500).send("Internal Server Error");
   }
});

// Server listen
app.listen(port, () => {
   // for local testing purpose only!!
   // console.log(`Server is running on http://localhost:${port}`);
   console.log("https://rrfoodblogapp0.azurewebsites.net");
});
