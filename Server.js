// const express = require("express");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcryptjs");

// const app = express();
// require("./server/database/conn");
// const Register = require("./server/models/registers");

// const port = process.env.AZURE_COSMOS_CONNECTIONSTRING || 3000;

// app.use(bodyParser.json())
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
//    extended:true
// }))

// app.get("/",(req,res)=> {
//    res.render("SignUp_Page");
// })

// app.get("/login",(req,res)=> {
//    res.render("Login_Page");
// })

// app.get("/register",(req, res)=>{
//    res.render("SignUp_Page");
// })
// // app.get("/AboutUs",(req,res)=> {
// //    res.render("AboutUs");
// // })

// // SignUp code
// app.post("/sign_up", async(req,res)=> {
//    try{
//       const password = req.body.password;
//       const ConfirmPassword = req.body.ConfirmPassword;
//       if(password === ConfirmPassword){
//          const registerusers = new Register({
//             name: req.body.name,
//             email: req.body.email,
//             password: password,
//             ConfirmPassword: ConfirmPassword
//          })

//          const registered = await registerusers.save();
//          res.status(201).sendFile(__dirname + '/public/Login_Page.html');
         
//       }else{
//          res.send("Invalid Password")
//       }

//    }catch(error) {
//       res.status(400).send(error);
//    }
// })

// //login 

// app.post("/login", async(req,res)=> {
//    try{
//         const email = req.body.email;
//         const password = req.body.password;
//         const useremail = await Register.findOne({email:email});

//       const isMatch =await bcrypt.compare(password,useremail.password); 
//         if(isMatch){
//             res.status(201).sendFile(__dirname + '/public/index.html');
//          }else{
//             res.send("Invalid Password");          
//          }    
//    } catch(error){
//       res.status(400).send("invalid Login Details")
//    }
// })

// app.listen(port,()=>{
//    console.log(`Server is running on http://localhost:${port}`)
// });

const express = require("express");
const bodyParser = require("body-parser");

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
      const { email, password } = req.body;
      const user = await Register.findOne({ email });

      if (!user) {
         return res.status(400).send("Invalid Email or Password");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (isMatch) {
         res.status(201).sendFile(__dirname + '/public/index.html');
      } else {
         res.status(400).send("Invalid Password");
      }
   } catch (error) {
      res.status(500).send("Server Error");
   }
});

// Server listen
app.listen(port, () => {
   //console.log(`Server is running on http://localhost:${port}`);
   console.log("https://foodblogapp.azurewebsites.net");
});
