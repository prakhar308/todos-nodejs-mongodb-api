$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)

    $("#todoInput").keypress(function(event){
        if(event.which == 13)
            createTodo();
    })

    $(".list").on("click","li",function(){
        updateTodo($(this));
    })

    $(".list").on("click",'span',function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    })
})

function addTodos(todos){
    // add todos to page
    todos.forEach(function(todo){
        addTodo(todo);
    })
}

function addTodo(todo){
    // add todos to page
    var newTodo = $('<li class = "task">' + todo.name + '<span>X</span></li>');
    newTodo.data("id",todo._id);
    newTodo.data("completed",todo.completed);
    if(todo.completed)
        newTodo.addClass("done");
    $('.list').append(newTodo);
}


function createTodo(){
    // send post request to create todo
    var usrInput = $("#todoInput").val();
    $.post("/api/todos",{name : usrInput})
    .then(function(newTodo){
        // clear the input
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    })
}

function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteURL = "api/todos/"+clickedId;
    $.ajax({
        method : 'DELETE',
        url : deleteURL
    })
    .then(function(data){
        todo.remove();
    })
}

function updateTodo(todo){
    var updateId = todo.data('id');
    var updateURL = "api/todos/"+updateId;
    var isDone = !todo.data('completed');
    var updatedData = {completed : isDone};
    $.ajax({
        method : "PUT",
        url : updateURL,
        data : updatedData
    })
    .then(function(updateTodo){
        todo.toggleClass("done");
        todo.data("completed",isDone);
    })
}