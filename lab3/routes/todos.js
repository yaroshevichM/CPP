const {
    Router
} = require('express');
const Todo = require('../models/Todos')
const router = Router();

router.get('/', async (req, res) => {

    const todos = await Todo.find({});
    console.log(todos);
    res.render('index', {
        title: "ToDo list",
        isIndex: true,
        todos: todos.map((t) => {
            return {
                title: t.title,
                id: t._id,
                completed: t.completed,
            };
        }),
    });
})

router.get('/create', (req, res) => {
    res.render('create', {
        title: "Create",
        isCreate: true,
    });
})

router.get('/edit', async (req, res) => {
    const todos = await Todo.find({completed: false});
    console.log(todos);
    res.render('edit', {
        title: "Edit",
        isEdit: true,
        todos: todos.map((t) => {
            return {
                title: t.title,
                id: t._id,
                completed: t.completed,
            };
        }),
    });
})

router.post('/edit', async (req, res) => {
    const todo = await Todo.findById(req.body.id);
    console.log("before udate",todo);
    console.log(req.body)
    todo.title = req.body.title;
    todo.save();
})

router.get('/delete', async (req, res) => {
    const todos = await Todo.find({completed: true});
    console.log(todos);
    res.render('delete', {
        title: "Delete",
        isDelete: true,
        todos: todos.map((t) => {
            return {
                title: t.title,
                id: t._id,
                completed: t.completed,
            };
        }),
    });
})

router.post('/delete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    console.log(todo);
    Todo.deleteOne(todo).then(() => {
        console.log('Successfuly deleted')
        todo.save();
        res.redirect('/delete')
    }).catch(e => console.log(e))
})

router.post('/create', async (req, res) => {
    console.log(req.body);
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save();
    console.log(todo);
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    console.log(req.body);
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed;

    await todo.save()
    res.redirect("/")
})


module.exports = router;