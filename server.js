// required packages
const csv = require("csv-parser");
const mongoose = require("mongoose");
const fs = require("fs");

// mongoose connection with db
mongoose.connect('mongodb://localhost:27017/csvdemo', {useNewUrlParser: true, useUnifiedTopology: true});


// student schema
const studentSchema = new mongoose.Schema({

    studentId: Number,
    Name:String,
    Contact:Number

})

// student model
const Student = mongoose.model("Student",studentSchema);

// reading from csv file
fs.createReadStream("sample-csv-data.csv")
.pipe(csv({}))
.on('data',(data)=>{

const newStudent = new Student(data);

// storing csv file data in database
 newStudent.save(data)
    .then(storedData=>{
        console.log("Data Stored:",storedData);
    })
    .catch(err=>{
        console.log(err);
    })


//eof    
})

