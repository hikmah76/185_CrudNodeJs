const express = require('express');
const router = express.Router();




let todos = [
    
{
    id : 1, task: "Belajar Nde.Js", complated: false
},
{
    id : 2, task: "Membuat API", complated: false
},
{
    id: 3, task: "Menulis Dokumentasi", completed: false, dueDate: "2023-12-10", priority: "low"
},
{
    id: 4, task: "Menguji Aplikasi", completed: false, dueDate: "2023-12-15", priority: "medium"
},
{
    id: 5, task: "Mengoptimalkan Kode", completed: false, dueDate: "2023-12-20", priority: "high"
},
{
    id: 6, task: "Mengintegrasikan Fitur Baru", completed: false, dueDate: "2023-12-25", priority: "medium"
}




];
//Endpoint untuk mendapatkan data todos
router.get('/', (req, res) => {res.json(todos)});

// Endpoint untuk mendapatkan data todos berdasarkan id
router.get('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);
    
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task, // Correctly reference the task from req.body
        completed: false,
        dueDate: req.body.dueDate, // Menambahkan dueDate
        priority: req.body.priority // Menambahkan priority
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});


//BARU
router.put('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(t => t.id === todoId);

    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    const { task, dueDate, priority, completed } = req.body; // Mengambil data dari body request

    // Update data
    todo.task = task !== undefined ? task : todo.task;
    todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;
    todo.priority = priority !== undefined ? priority : todo.priority;
    todo.completed = completed !== undefined ? completed : todo.completed;

    res.json(todo); // Mengembalikan todo yang sudah diperbarui
});

// Endpoint untuk menghapus todo berdasarkan ID
router.delete('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === todoId);

    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(todoIndex, 1); // Menghapus todo dari array
    res.status(204).send(); // Mengembalikan response 204 No Content
});


module.exports = router;