const express = require('express');
const app = express();
const todosRoute = require('./routes/todo.js'); // Benar
const port = 3000;

app.use(express.json());
app.use('/todos', todosRoute);



// Jalankan server di port 8080





app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
