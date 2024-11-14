const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb+srv://kushagrawal123321:FvYODmuCM4BwpfAy@ashhhcluster.n07iy.mongodb.net/?retryWrites=true&w=majority&appName=ashhhcluster')
.then(()=>{
    console.log("Connection open for mongoose DB running successfully")
})

.catch(err =>{
    console.log("Oh no mongo threw an error")
    console.log(err)

})