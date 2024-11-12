// Requiring in the files
const express = require('express')
const app = express();
const ejsMate = require('ejs-mate')
const path = require('path')
const axios = require('axios')
const cors = require("cors");
const connectDB = require("./utils/connectionDB")
const bodyParser = require('body-parser');


// Including in the userModel in it here 
const User = require('./models/userDetails')
const Company = require('./models/companyDetails')
const StudentDetails = require('./models/studentDetails')
const CompanyInfo = require('./models/companyInfo'); // Uncomment 2 
const CompanyRecord = require('./models/companyRecord')
const ApplicationDetails = require('./models/applicationStatus')
// const CompanRecord = require('./models/companyRecord) // Uncomment 4 


//My unique id carrier jugaad 
let emailIdCarrier = '';
let emailIdCompanyCarrier = '';

// Middlewares here please  
app.engine('ejs',ejsMate)
app.use(express.json())
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(cors({ origin: true }));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json()); // used to send in and parse the json format 


// Route 1
app.get('/',(req,res)=>{
    // res.send("Home page");
    res.render('Homepage.ejs')
})



// Route 2
app.get('/loginStudent',(req,res)=>{ 
    // res.send("Home page");
    res.render('registerStudent.ejs')
})

// Route to handle the form data which is coming when we are registering the students 
app.post('/login/student',async(req,res)=>{
    // res.send("Idhar hit ho gya h test!!!!")
    // the above code is for testing ki route hit hora h ki nhi



    const{computerCode, email} = req.body;

    emailIdCarrier= req.body.email;
    console.log(emailIdCarrier);
    
    const user = await User.findOne({computerCode, email });
    // userIdCarrier = user._id;
    // console.log("The user id is ");
    // console.log(userIdCarrier)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(req.body.password!==user.password){
        return res.status(400).json({message: 'Wrong password'});
    }

    const studentDetails = StudentDetails.findOne({email : emailIdCarrier});

    if(studentDetails){
        res.redirect('/view/studentProfile')
    }

    else{

    // yaha pe present h matlab ki auth and password verify ho gye h so 
    // redirect krdo studentProfile k upar 
    res.render('studentProfile',{user})
    }
})


app.post('/studentProfile',async(req,res)=>{
    console.log(req.body);

    const student = new StudentDetails(req.body);
    await student.save();

//   res.send("Saving of the user is successfull")


    res.send("Saved the student details successfully")
})

app.get('/view/studentProfile',async(req,res)=>{

    const student = await StudentDetails.findOne({email : emailIdCarrier});
    console.log("here bud")
    // console.log(userData);
    res.render('viewStudentProfile',{student})


    // res.render('viewStudentProfile')
})


// We will render in all the companies here in the Company List section under the student login 
// app.get('/companyList',(req,res)=>{
//     // Here we will render in all the companies 
//     res.render('companyList')

// })


// The one time use code for creating in the users and ids
  
// console.log(req.body)
// const { computerCode, email, password } = req.body;

// const user = new User({
//     computerCode,
//     email,
//     password
//   });
//   await user.save();
//   res.send("Saving of the user is successfull")




// console.log(req.body)
// const { adminUsername, email, password } = req.body;

// const company = new Company({
//     adminUsername,
//     email,
//     password
//   });
//   await company.save();
//   res.send("Saving of the company is successfull")





// Route3
app.get('/loginCompany',(req,res)=>{
    // res.send("Home page");
    res.render('registerCompany.ejs')
})

app.post('/login/company',async(req,res)=>{

    // res.send("Idhar hit ho gya h test!!!!")
    // the above code is for testing ki route hit hora h ki nhi

    const{adminUsername, email} = req.body;


    
    const company = await Company.findOne({adminUsername, email });

    emailIdCompanyCarrier = req.body.email;
    console.log(emailIdCompanyCarrier)
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    if(req.body.password!==company.password){
        return res.status(400).json({message: 'Wrong password'});
    }

    // it means finding in the exisiting company just to keep the same name using it 
    const newCompanyDetails = await CompanyInfo.findOne({companyEmail: emailIdCompanyCarrier})

    if(newCompanyDetails){
        
        // res.render('viewCompanies',{newCompanyDetails})
        res.redirect('/viewCompanyDetails')

    }

    // yaha pe present h matlab ki auth and password verify ho gye h so 
    // redirect krdo studentProfile k upar 
    // res.send('hahahacom')
    res.render('addCompany.ejs')
})

app.get('/viewCompanyDetails',async(req,res)=>{
      // it means finding in the exisiting company just to keep the same name using it 
      const newCompanyDetails = await CompanyInfo.findOne({companyEmail: emailIdCompanyCarrier})
    res.render('viewCompanies',{newCompanyDetails}) 

})




// Uncomment 1 
// Creating a route to handle in the company Info 
app.post('/addCompanyInfo',async(req,res)=>{
    // adding in directly to the schema 

    const newCompanyDetails = new CompanyInfo(req.body);
    const companyEmail = req.body.companyEmail;
    await newCompanyDetails.save();

    console.log("here check>>>>>")
    const newCompanyNowOpenStudents =  new CompanyRecord({companyEmail});
    await newCompanyNowOpenStudents.save();
    res.render('viewCompanies',{newCompanyDetails})

// Now here we will create that company apply system 
        // const newRecord = new companyRecord({companyEmail: emailIdCompanyCarrier});
        // await newRecord.save();

    // Now the company details are succesfully registered 


})



app.get('/editCompanyDetails',async(req,res)=>{

    // const newCompanyDetails = new CompanyInfo(req.body);
    const updatedCompanyDetail = await CompanyInfo.findOne({companyEmail: emailIdCompanyCarrier });
    console.log(updatedCompanyDetail)
    res.render('editCompany',{updatedCompanyDetail})

})

// View company page // Uncomment 3 
// app.get('/viewCompanyInfo',async(req,res)=>{

//     const companyinfo = await CompanyInfo.findOne(email);

//     res.render('viewCompanyInfo',{companyinfo});
// })


// Uncomment 6 
app.post('/updateCompanyInfo', async (req, res) => {

    const updatedData = req.body;  
    
      // Find the user by email and update it with the new data
      const newCompanyDetails = await CompanyInfo.findOneAndUpdate({ companyEmail: emailIdCompanyCarrier }, updatedData, { new: true });

      // Send back the updated user data
    //   return res.status(200).json({ message: 'Company updated successfully', companyData });
    res.render('viewCompanies',{newCompanyDetails})
    }
  );



  // student is clicking in the apply button 
  app.get('/applyToCompany/:id',async(req,res)=>{
    // console.log(req.params.id);

    // const companyEmailFromButton = req.params.id;
    // console.log(companyEmailFromButton)


    // // const companyDetails = await CompanyInfo.findOne({companyEmail: companyEmailFromButton})
    // const companyRecord = await CompanyRecord.findOne({companyEmail: companyEmailFromButton});

    // const companyEmailExtract = companyRecord.companyEmail;

    console.log(req.params.id);

    const companyEmailFromButton = req.params.id;
    console.log(companyEmailFromButton);

 
        // finding the company record 
        const updatedCompanyRecord = await CompanyRecord.findOneAndUpdate(
            { companyEmail: companyEmailFromButton },
            { $push: { registeredStudents: emailIdCarrier } },
            { new: true } // This option returns the updated document
        );
        



        const newApplicationStatus = await ApplicationDetails({
            studentEmail: emailIdCarrier,
            companyEmail: companyEmailFromButton,
            applicationStatus: 'pending(Applied)'

        })
        await newApplicationStatus.save();

        // const allApplicationStatus = await ApplicationDetails.find({});

        res.redirect('/appliedStatusInCompanies')
     

         

      
  

    

  })

  app.get('/appliedStatusInCompanies',async(req,res)=>{
       // vo record jaha pe applicationStatus pending h 
       const pendingApplications = await ApplicationDetails.find({ 
        applicationStatus: "pending(Applied)", 
        studentEmail: emailIdCarrier 
    });
    

    // Extract the companyEmail from each record into a new array
    const pendingCompanyEmails = pendingApplications.map(record => record.companyEmail);

    // vo emails h jo pending k andar h 



    // same for the rejected and shortlisted 
    const shortListedApplications =  await ApplicationDetails.find({ applicationStatus: "ShortListed", studentEmail: emailIdCarrier});
    const shortListedCompanyEmails = shortListedApplications.map(record => record.companyEmail);


    // Rejected 
    const rejectedApplications = await ApplicationDetails.find({ applicationStatus: "Rejected" ,studentEmail: emailIdCarrier});
    const rejectedCompanyEmails = rejectedApplications.map(record => record.companyEmail);

    console.log(pendingApplications);        // Shows the filtered records with "pending(Applied)"
    console.log(pendingCompanyEmails);       // Shows an array of companyEmail with "pending(Applied)"


    const companies = await CompanyInfo.find({});

    // console.log("all applcationsStatus")
    // console.log(allApplicationStatus.)

    res.render('appliedStatus',{companies,pendingCompanyEmails,emailIdCompanyCarrier,rejectedCompanyEmails,shortListedCompanyEmails})


  })


  // Check applied status 




//   app.get('/viewCompaniesFromStudent',async(req,res)=>{
//     // getting all the companies 
//     // const companies = await Company.find({});
//     // console.log("Company Details:", companies);
//     const companies = await CompanyInfo.find({});
//     // console.log(companyInfo)
//     res.render('companyList',{companies})

//   })

app.get('/viewCompaniesFromStudent', async (req, res) => {
    try {
      const companies = await CompanyInfo.find({});
      const studentEmail = emailIdCarrier; // Assuming emailIdCarrier is set
  
      // Fetch applications for the current student
      const applications = await ApplicationDetails.find({ studentEmail });
  
      // Map applications to quickly check application status for each company
      const applicationMap = applications.reduce((map, app) => {
        map[app.companyEmail] = app.applicationStatus;
        return map;
      }, {});
  
      // Pass application status along with company details
      const companyData = companies.map(company => {
        const status = applicationMap[company.companyEmail] || 'Not Applied';
        return {
          ...company._doc,
          applicationStatus: status,
        };
      });
  
      res.render('companyList', { companies: companyData });
    } catch (error) {
      console.error("Error fetching companies or applications:", error);
      res.status(500).send("An error occurred.");
    }
  });
  
  
  

// Uncomment 5 
// Rooute for the student to register for a particular company 




// Company ki taraf se applied students 

app.get('/appliedStudents',async(req,res)=>{

    const companyRecordForStudentsApplied = await CompanyRecord.findOne({companyEmail: emailIdCompanyCarrier})
    if (!companyRecordForStudentsApplied) {
        return res.status(404).send("Company not found.");
    }

    console.log(companyRecordForStudentsApplied)

    // Finding in there info 
    const registeredStudentEmails = companyRecordForStudentsApplied.registeredStudents;
    const studentDetails = await StudentDetails.find({
        email: { $in: registeredStudentEmails }
    });

    console.log(registeredStudentEmails)


        const applicationStatuses = await ApplicationDetails.find({
            studentEmail: { $in: registeredStudentEmails },
            companyEmail: emailIdCompanyCarrier
        });

        console.log(applicationStatuses)

        const applicationStatusMap = {};
        applicationStatuses.forEach(app => {
            applicationStatusMap[app.studentEmail] = app.applicationStatus || "Not Applied";
        });

        console.log(applicationStatusMap)

        const studentData = studentDetails.map(student => ({
            name: student.name,
            branch: student.branch,
            email: student.email,
            cgpa: student.cgpa,
            resume: student.resume,
            linkedinProfile: student.linkedinProfile,
            applicationStatus: applicationStatusMap[student.email] || "Not Applied"
        }));


        console.log("Testing ")
        console.log(studentData)

        res.render('appliedStudents',{studentData,emailIdCompanyCarrier});
})

app.get('/shortlist/:studentEmailFromButton/register/:companyEmailFromButton',async(req,res)=>{

    const {studentEmailFromButton, companyEmailFromButton} = req.params;
    try {
        // Find the application and update its status to 'ShortListed'
        const updatedApplication = await ApplicationDetails.findOneAndUpdate(
            {
                studentEmail: studentEmailFromButton, 
                companyEmail: companyEmailFromButton
            },
            {
                $set: { applicationStatus: 'ShortListed' }
            },
            {
                new: true,  // Return the updated document
                runValidators: true  // Ensure any validation rules are applied
            }
        );
       

       res.redirect('/appliedStudents')
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
 


})

// Work here 
app.get('/applicationStatus',async(req,res)=>{
    // const allApplicationStatus = await ApplicationDetails.find({});
    const pendingApplications = await ApplicationDetails.find({ applicationStatus: "pending(Applied)" });

    // Extract the companyEmail from each record into a new array
    const pendingCompanyEmails = pendingApplications.map(record => record.companyEmail);


    // same for the rejected and shortlisted 
    const shortListedApplications =  await ApplicationDetails.find({ applicationStatus: "ShortListed" });
    const shortListedCompanyEmails = shortListedApplications.map(record => record.companyEmail);


    // Rejected 
    const rejectedApplications = await ApplicationDetails.find({ applicationStatus: "Rejected" });
    const rejectedCompanyEmails = rejectedApplications.map(record => record.companyEmail);

    console.log(pendingApplications);        // Shows the filtered records with "pending(Applied)"
    console.log(pendingCompanyEmails);       // Shows an array of companyEmail with "pending(Applied)"


    const companies = await CompanyInfo.find({});

    // console.log("all applcationsStatus")
    // console.log(allApplicationStatus.)

    res.render('appliedStatus',{companies,pendingCompanyEmails,rejectedCompanyEmails,shortListedCompanyEmails})



})

app.get('/reject/:studentEmailFromButton/register/:companyEmailFromButton', async (req, res) => {
    const { studentEmailFromButton, companyEmailFromButton } = req.params;

    try {
        // Find the application and update its status to 'Rejected'
        const updatedApplication = await ApplicationDetails.findOneAndUpdate(
            {
                studentEmail: studentEmailFromButton, 
                companyEmail: companyEmailFromButton
            },
            {
                $set: { applicationStatus: 'Rejected' }
            },
            {
                new: true,  // Return the updated document
                runValidators: true  // Ensure any validation rules are applied
            }
        );


        res.redirect('/appliedStudents')
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



  

app.use('*',(req,res)=>{
res.send("All unspecified req here please")

})

  

// Setting in the server port 
app.listen(3000,()=>{
    console.log("Placement cell Server running on port 3000 ")
})