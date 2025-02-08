const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/',(req,res)=>{
    db.query('SELECT * from syllabus',(err,syllabus)=>{
        if(err) throw err;
        res.render('dropdown',{ syllabus })
    })
})

router.get('/years',(req,res)=>{
    db.query('SELECT * from year',(err,year)=>{
        if(err) throw err;
        res.json(year)
    })
})

router.get('/subjects',(req,res)=>{
    db.query('SELECT * from subject',(err,subject)=>{
        if(err) throw err;
        res.json(subject)
    })
})

router.get('/chapters/:subjectId/:yearId', (req, res) => {
    const subjectId = req.params.subjectId;
    const yearId = req.params.yearId;
    const query = "SELECT chapter_id, chapter_name FROM chapter WHERE subject_id = ? and year_id=?";
    db.query(query, [subjectId,yearId], (err, chapters) => {
        if (err) throw err;
        res.json(chapters);
    });
});

module.exports = router;