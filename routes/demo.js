const express = require('express');
const router = express.Router();
const db = require('../database')
const multer = require('multer')

router.use(express.urlencoded({ extended: false }));
const upload = multer({ dest: 'uploads/' })

router.get('/demo',(req,res)=>{
    res.render("demo");
})

router.post('/upload/:chapterid',upload.fields([{name:'file1'},{name:'file2'}]),(req,res)=>{
    const { question } = req.body;
    const chapter_id = req.params.chapterid;
    if (!question) {
        return res.status(400).json({ error: 'Question text is required' });
    }
    const file1Path = req.files['file1'] ? req.files['file1'][0].path : null;
    // const file2Path = req.files['file2'] ? req.files['file2'][0].path : null;
    const query = 'INSERT INTO question (question,chapter_id, question_image) values(?,?,?)';
    db.query(query, [question, chapter_id, file1Path], (err, result) =>{
        if (err) {
            console.error('Database error:', err);         
            return res.status(500).json({ error: 'Failed to insert data into the database' });
        }

        res.status(201).json({ message: 'Data inserted successfully', data: result });
    })
    // console.log(req.files);
})




module.exports = router;