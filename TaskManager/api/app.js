const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {
    mongoose
} = require('./db/mongoose');

// Load mongoose models

const {
    Task,
    List
} = require('./db/models/index');

// Load middleware

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ROUTE HANDLERS



// LIST ROUTES

app.get('/lists', (req, res) => {
    List.find({}).then((lists) => {
        res.send(lists);
    })
});

app.post('/lists', (req, res) => {
    let title = req.body.title;

    let newList = new List({
        title
    });

    newList.save().then(listDoc => {
        res.send(listDoc);
    })
});

app.get('/lists/:id', (req, res) => {
    List.find({
        _id: req.params.id
    }).then((list) => {
        res.send(list);
    })
})

app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }).then(() => {
        res.send({
            message: "Updated"
        });
    })
});

app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id
    }, {
        $set: req.body
    }).then((removeListDoc) => {
        res.send(removeListDoc);
    })
});

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
})

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.find({
        _id: req.params.id,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
})

app.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc)
    })
})

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.send({
            message: "Updated"
        });
    })
})

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
})

app.listen(3000, () => {
    console.log("Server start")
})