require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const jwt = require("jsonwebtoken")

const templatePath = path.join(__dirname, "../templates");
const collection = require("./mongodb")

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);

//this one line will help us to get mongodb data
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


// Signup
app.post("/signup", async (req, res) => {
    try {
      // Create an instance of the collection model
      const data = new collection({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      console.log("Data to be inserted:", data);
  
      // Use save() to save the instance to the database
      const user = await data.save();
  
      if (user) {
        // Call the generateAuthToken method on the model itself
        const token = await data.generateAuthToken();
        console.log("Generated token for signup: "  + token);
        // console.log("Data inserted successfully:", user);
        // console.log(token);
        res.render("home");
      } else {
        console.error("Data insertion failed");
        res.status(500).send("Signup failed");
      }
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Signup failed");
    }
  });
  

// for Login
// for Login
app.post("/login", async (req, res) => {
    try {
      console.log("Login attempt with username: " + req.body.name);
      console.log("Password: " + req.body.password);
  
      const user = await collection.findOne({ name: req.body.name, password: req.body.password });
  
      if (user) {
        // User found with matching credentials
        console.log("Login successful for username: " + req.body.name);
        const token = await user.generateAuthToken(); // Call the method on the user instance
        console.log("Generated token: for login " + token);
        res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}`, token });
      } else {
        // User not found or incorrect password
        console.log("Login failed for username: " + req.body.name);
        res.send("Incorrect username or password");
      }
    } catch (e) {
      console.error("Error:", e);
      res.status(500).send("An error occurred during login");
    }
  });
  
  
  


app.listen(3000, () => {
    console.log("Port connected...");
});
