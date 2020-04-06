var db = require('../models');

// get all todos
exports.getTodos = function(req,res){
    db.Todo.find()
    .then(function(todos){
        res.json(todos)
    })
    .catch(function(err){
        // res.send(err);
        console.log(err);
    })
}

// create a todo
exports.createTodo = function(req,res){
    db.Todo.create(req.body)
    .then(function(newTodo){
        res.status(201).json(newTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

// get a single todo
exports.getTodo = function(req,res){
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })  
    .catch(function(err){
        res.send(err);
    })
}

// update a todo
exports.updateTodo = function(req,res){
    db.Todo.findOneAndUpdate({_id : req.params.todoId},req.body,{new : true})
    .then(function(todo){
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
}

// delete a todo
exports.deleteTodo = function(req,res){
    db.Todo.remove({_id : req.params.todoId})
    .then(function(){
        res.json({message : "Successfully deleted!!"})
    })
    .catch(function(err){
        res.send(err);
    })
}

module.exports = exports;