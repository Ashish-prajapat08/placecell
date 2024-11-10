const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://127.0.0.1:27017/AryPlaceCell')
.then(()=>{
    console.log("Connection open for mongoose DB running successfully")
})

.catch(err =>{
    console.log("Oh no mongo threw an error")
    console.log(err)

})