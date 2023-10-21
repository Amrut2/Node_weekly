// any function that is passed as argument in any function then it is called a callback function

// exampe

// const funA = () =>{
//     console.log("helloA")
// }

// const funB = () =>{
//     console.log("helloB")
// }

// funA();
// funB();


const perOne = (friend, callFriend) => {
    console.log(`I am busy right now ${friend}`);

    callFriend();
}


const perTwo = () =>{
    console.log("hey what's up")
}

perOne("Amrut", perTwo);
