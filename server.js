const express = require('express');
const app = express();
const db = require('./database');
const path = require('path')


app.use(express.static('public'));
app.set("view engine", "ejs");



const adddropdownRouter = require('./routes/add_dropdown');
app.use("/", adddropdownRouter);
const editdropdownRouter = require('./routes/edit_dropdown');
app.use("/edit", editdropdownRouter);
const questionRouter = require('./routes/question');
app.use("/",questionRouter)
const demo = require('./routes/demo');
app.use("/",demo)
const home = require('./routes/home');
app.use("/",home)
const edit = require('./routes/edit_question');
app.use("/",edit)


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});