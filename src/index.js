const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const templatePath = path.join(__dirname, "../templates");
const LogInCollection = require("./mongodb")

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

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    try {

        console.log("Data to be inserted:", data);
        const user = await LogInCollection.create(data);
        if (user) {
            console.log("Data inserted successfully:", user);
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
app.post("/login", async (req, res) => {


    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    }

    catch (e) {

        res.send("wrong details")


    }


});


app.listen(3000, () => {
    console.log("Port connected...");
});
