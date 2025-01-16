const express = require('express');
const router = express.Router();
const db = require('../database')
const multer=require('multer')
const path=require('path')
router.use(express.json());  // This line is important
const fs = require('fs');

router.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'../uploads'); 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
})
const upload = multer({ dest: '../uploads/' })

router.post('/submit-question/:chapterId',
    upload.fields([
        {name: 'question_image'},
        // {name: 'solution_image'},
        // {name: 'option1_image'},
        // {name: 'option2_image'},
        // {name: 'option3_image'},
        // {name: 'option4_image'},
    ]), 
    (req, res) => {
    // const { question,question_type,option1,option2,option3,option4,solution,level,key,minimum_time} = req.body;  
    const { question} = req.body;  
    const chapterId = req.params.chapterId;
    const files = req.files; // contains the uploaded files
    // Check if files exist and log filenames
    console.log(files)
    //check if file exist, otherwise assign null
    // const question_image = files['question_image'] ? files['question_image'][0].filename:null;
    // const option1_image = files['option1_image'] ? files['option1_image'][0].filename : null;
    // const option2_image = files['option2_image'] ? files['option2_image'][0].filename : null;
    // const option3_image = files['option3_image'] ? files['option3_image'][0].filename : null;
    // const option4_image = files['option4_image'] ? files['option4_image'][0].filename : null;
    // const solution_image = files['solution_image'] ? files['solution_image'][0].filename : null;


    // const query = 'INSERT INTO question (question,chapter_id, question_type, option1, option2, option3, option4, solution, level, answer_key, minimum_time, question_image, option1_image, option2_image, option3_image, option4_image, solution_image)';
    const query = 'INSERT INTO question (question,chapter_id, question_image) values(?,?,?)';
    db.query(query,
            [   question || null,
                chapterId,
                // question_type || null,
                // option1 || null,
                // option2 || null,
                // option3 || null,
                // option4 || null,
                // solution || null,
                // level || null,
                // key || null,
                // minimum_time || null,
                question_image,
                // option1_image,
                // option2_image,
                // option3_image,
                // option4_image,
                // solution_image
            ], 
            (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to insert question' });
        }
        console.log("Data inserted:", result);
        res.status(201).json({ message: 'Question added successfully' });
    });
});

module.exports = router;