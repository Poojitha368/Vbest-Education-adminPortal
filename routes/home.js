const express = require("express");
const router = express.Router();
const db = require("../database");

router.get('/home',(req,res)=>{
    res.render('home')
})

module.exports = router;