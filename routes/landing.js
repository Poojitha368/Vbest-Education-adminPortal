const express = require("express");
const router = express.Router();
const db = require("../database");

router.get('/landing',(req,res)=>{
    res.render('landing')
})

module.exports = router;