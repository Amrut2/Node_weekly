const fs = require("fs")

// what async does is if any request is taking alot of time then it just executed the other commands waiting in line...

const data = fs.readFile("notes.txt",'utf-8', (err, data) =>{
    console.log(data);
});

console.log("I am executing first because readFile is taking a little more time.... ");

// see when async function is executed then if that thing is taking time meanwhile in that time the other commands are executed despite of the order and once the async function finished loading then it is executed......