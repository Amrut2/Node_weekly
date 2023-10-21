const fs = require('fs')
//reading our notes.txt

const data = fs.readFileSync('notes.txt', "utf-8");
console.log(data);

console.log("I will appear only when the data is done loading not matter how long it takes...")
console.log("this is the problem with sync cause loading data can take minutes, hours or unknown time till that we have to wait..........")