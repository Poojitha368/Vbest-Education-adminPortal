const express = require("express");
const router = express.Router();
const db = require('../database');
const multer = require("multer");
const fs = require("fs");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Ensure upload directory exists
const uploadDir = "./uploads";

// Multer Configuration
const imgConfig = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const modifiedName = file.originalname.replace(/\s+/g, "_");
        cb(null, `image-${Date.now()}-${modifiedName}`);
    },
});

const isImage = (req, file, cb) => {
    file.mimetype.startsWith("image") ? cb(null, true) : cb(new Error("Invalid file type"), false);
};

const upload = multer({ storage: imgConfig, fileFilter: isImage });

// Route to render form page
router.get("/questions", (req, res) => res.render("questions"));

// POST route for form submission
router.post(
    "/upload",
    upload.fields([
        { name: "question_image" },
        { name: "solution_image" },
        { name: "option1_image" },
        { name: "option2_image" },
        { name: "option3_image" },
        { name: "option4_image" },
    ]),
    (req, res) => {
        try {
            console.log("Form Data:", req.body);
            console.log("Uploaded Files:", req.files);

            const { chapter_id, question, question_type, level, key, minimum_time, option1, option2, option3, option4, solution } = req.body;
            if (!question) return res.status(400).json({ error: "Question text is required" });

            const extractFilename = (field) => req.files[field]?.[0]?.filename || null;

            const formData = {
                chapter_id, question, question_type, level, key, minimum_time, option1, option2, option3, option4, solution,
                question_image: extractFilename("question_image"),
                solution_image: extractFilename("solution_image"),
                option1_image: extractFilename("option1_image"),
                option2_image: extractFilename("option2_image"),
                option3_image: extractFilename("option3_image"),
                option4_image: extractFilename("option4_image"),
            };
            
            const query = `INSERT INTO question (chapter_id,question,level,answer_key,
            minimum_time,question_image,option1_image,option2_image,option3_image,option4_image,
            solution_image,solution,question_type,option1,option2,option3,option4 )
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            const values = [
                formData.chapter_id, formData.question, formData.level, formData.key, formData.minimum_time,
                formData.question_image, formData.option1_image, formData.option2_image, formData.option3_image, formData.option4_image,
                formData.solution_image, formData.solution, formData.question_type, formData.option1, formData.option2, formData.option3, formData.option4
            ];

            db.query(query, values, (err, result) => {
                if (err) {
                    console.error("Database error:", err);
                    return res.status(500).json({ error: "Database error", details: err.message });
                }
                res.status(200).json({ message: "Question added successfully", data: formData });
            });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
);

module.exports = router;
