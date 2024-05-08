const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors()); 
app.use(express.json());

mongoose.connect("mongodb+srv://Krutika:TiDnYmF9OLCAg45k@cluster0.ehz3zak.mongodb.net/online-scheduler");

const instructorSchema = new mongoose.Schema({
    name: String,
    subject: String,
})

const courseSchema = new mongoose.Schema({
    name: String,
    level: String,
    description:String,
})

const ischema = mongoose.model("instructors", instructorSchema);
const cschema = mongoose.model("courses", courseSchema);
console.log("connected!");

app.get("/list-of-instructors", async function(req, res){
    const instructor = await ischema.find({});
    res.json({ 
        instructor
});
})

app.post("/add-course", async function(req, res){
    console.log(req.body);
    await cschema.create({  
        name: req.body.name,
        level: req.body.level,
        description:req.body.description,
    })
    res.json({
        msg:"Course Added!"
    })
})

app.listen(5000);