const path = require('path')
const  express = require('express')
const exp = require('constants')
const app = express()



const publicDirectorPath = path.join(__dirname, "./public");
console.log(publicDirectorPath)
const port = 3000

app.use(express.static(publicDirectorPath))

// console.log(__dirname); // dirname is used to get path of the required folder which we want 
// console.log(path.join(__dirname, "./public"));


app.get('/help', (req,res)=>{
    const filePath = path.join(publicDirectorPath, 'help.html');
    res.sendFile(filePath);
})

app.get('/about', (req,res)=>{
    const filePath = path.join(publicDirectorPath, 'about.html')
    res.sendFile(filePath)
})


app.get('/weather', (req,res) =>{
    res.send("weather");
})
app.listen(port, () =>{
    console.log(`listening on port ${port}`);
})