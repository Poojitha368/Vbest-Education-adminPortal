const express = require("express");
const router = express.Router();
const db = require("../database");

router.get('/edit',(req,res)=>{
    res.render('edit_question')
})

module.exports = router;