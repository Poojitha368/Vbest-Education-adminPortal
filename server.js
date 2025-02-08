const express = require('express');
const app = express();
const db = require('./database');
const path = require('path')


app.use(express.static('public'));
app.set("view engine", "ejs");



const dropdownRouter = require('./routes/dropdown');
app.use("/", dropdownRouter);
const questionRouter = require('./routes/question');
app.use("/",questionRouter)
const demo = require('./routes/demo');
app.use("/",demo)


// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});