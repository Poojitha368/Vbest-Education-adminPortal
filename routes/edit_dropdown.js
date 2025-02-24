const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/edit',(req,res)=>{
    db.query('SELECT * from syllabus',(err,syllabus)=>{
        if(err) throw err;
        res.render('edit_dropdown',{ syllabus })
    })
})

router.get('/edit/years',(req,res)=>{
    db.query('SELECT * from year',(err,year)=>{
        if(err) throw err;
        res.json(year)
    })
})

router.get('/edit/subjects',(req,res)=>{
    db.query('SELECT * from subject',(err,subject)=>{
        if(err) throw err;
        res.json(subject)
    })
})

router.get('/edit/chapters/:subjectId/:yearId', (req, res) => {
    const subjectId = req.params.subjectId;
    const yearId = req.params.yearId;
    const query = "SELECT chapter_id, chapter_name FROM chapter WHERE subject_id = ? and year_id=?";
    db.query(query, [subjectId,yearId], (err, chapters) => {
        if (err) throw err;
        res.json(chapters);
    });
});

module.exports = router;