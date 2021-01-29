const express = require('express');
const app = express();
require("./db/conn");
const Student = require("./models/students");

const port = process.env.PORT || 3000;
const validator = require('validator');

app.get("/student/:id",async (req, res) => {

    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData)
        }
        
    } catch (error) {
        res.status(500).send()
    }
    
})


app.use(express.json())

// create a new student using post http method
app.post("/students", (req, res) => {
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user);
        console.log(user);
    }).catch((e) => {
        res.status(400).send(e);
    })

    // console.log(req.body);
    // res.send("hello");
});

// patch http method in nodeJS
app.patch('/student/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIndexAndUpdate(_id, req.body);
        res.send(updateStudent);
        if(!studentData){
            res.status(404).send();
        }else{
            res.send(studentData);
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

//Delete http method in nodeJs

app.delete('/student/:id', async(req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent)
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`${port} listening`);
})