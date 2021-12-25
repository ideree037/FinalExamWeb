const express = require('express');
const { Console } = require("console");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

class toDoList {
    constructor(_id, taskTitle, insertdate, isCompleted){
        this._id = id;
        this.taskTitle = taskTitle;
        this.insertdate = insertdate;
        this.isCompleted = isCompleted;
    } 
}

const uri = "mongodb+srv://ideree:ideree@cluster0.px9du.mongodb.net/ToDoList?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const collection = client.db("ToDoList").collection("Lists");

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('/style.css'));
app.use('/style.css', express.static(__dirname + '/style.css'));
app.use('/script.js', express.static(__dirname + '/script.js'))

app.get("/", function(req, res) {
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    let list_arr = [];
    client.connect((error, result) => {
        const collection = client.db("ToDoList").collection("Lists");
        collection.find().toArray().then( result => {
            list_arr = result.slice();
        }).catch(error => console.error(error))
    });
    
    console.log(list_arr);
    client.close();
    res.render('index', {List: list_arr});
    //res.sendFile(__dirname + "/home.html");
});
app.get("/index", function(req,res) {
    res.sendFile(__dirname + "/index.html")
});
app.post("/", function(req, res) {
    var _taskTitle = "Task 1"
    var _insertDate = Date.now()
    var _isCompleted = "1"

    client.connect((error, result ) =>{
        const collection = client.db("ToDoList").collection("Lists");
        collection.insertOne({id: 1, taskTitle: "myTask1", insertdate: Date.now(), isCompleted: true}).then(result => { console.log(result)}).catch(error=>console.error(error));
        client.close();
    })

});

app.listen(3000, function() {
    console.log('Starting server at port 3000')
});