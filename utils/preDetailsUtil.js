const mongoose = require('mongoose')
const PreDetails= require('../models/preDetails')

const Connection = mongoose.connect('mongodb+srv://kushagrawal123321:FvYODmuCM4BwpfAy@ashhhcluster.n07iy.mongodb.net/?retryWrites=true&w=majority&appName=ashhhcluster')
.then(()=>{
    console.log("Connection open for mongoose DB running successfully")
})

.catch(err =>{
    console.log("Oh no mongo threw an error")
    console.log(err)

})
// const newRecord= {
//     "computerCode": "54002",
//     "name": "Anushka ",
//     "branch": "CSE",
//     "year": 3,
//     "degree": "B.Tech"
// }
const newRecords = [
    {
        "computerCode": "54003",
        "name": "Rahul Mehta",
        "branch": "ECE",
        "year": 2,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54004",
        "name": "Sneha Patel",
        "branch": "Mechanical",
        "year": 1,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54005",
        "name": "Amit Kumar",
        "branch": "Civil",
        "year": 3,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54006",
        "name": "Priya Singh",
        "branch": "IT",
        "year": 4,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54007",
        "name": "Vikram Sinha",
        "branch": "CSE",
        "year": 3,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54008",
        "name": "Neha Sharma",
        "branch": "Chemical",
        "year": 2,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54009",
        "name": "Rohit Deshmukh",
        "branch": "Aerospace",
        "year": 4,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54010",
        "name": "Anjali Nair",
        "branch": "Electrical",
        "year": 1,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54011",
        "name": "Deepak Chawla",
        "branch": "CSE",
        "year": 2,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54012",
        "name": "Kavita Joshi",
        "branch": "ECE",
        "year": 3,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54013",
        "name": "Sunil Yadav",
        "branch": "Mechanical",
        "year": 4,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54014",
        "name": "Shweta Agarwal",
        "branch": "Civil",
        "year": 1,
        "degree": "B.Tech"
    },
    {
        "computerCode": "54015",
        "name": "Pooja Reddy",
        "branch": "IT",
        "year": 2,
        "degree": "B.Tech"
    }
]


// async function myFunction() {
//   const savedData = new PreDetails(newRecord);
// await savedData.save();
// }


async function saveMultipleRecords() {
    try {
      // Use insertMany to save multiple records at once
      const savedData = await PreDetails.insertMany(newRecords);
      console.log('Records saved successfully:', savedData);
    } catch (error) {
      console.error('Error saving records:', error);
    }
  }
  
saveMultipleRecords()
.then(()=>{
   console.log("User saved successfully")
     })

// myFunction()
// .then(()=>{
//     console.log("User saved successfully")
// })