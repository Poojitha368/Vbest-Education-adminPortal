// Express Router
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Ensure upload directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

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
    "/upload/:chapterid",
    upload.fields([
        { name: "question_image" },
        { name: "solution_image" },
        { name: "option1_image" },
        { name: "option2_image" },
        { name: "option3_image" },
        { name: "option4_image" },
    ]),
    (req, res) => {
        console.log(req);
        try {
            const { question, question_type, level, key, minimum_time, option1, option2, option3, option4, solution } = req.body;
            if (!question) return res.status(400).json({ error: "Question text is required" });

            const extractFilename = (field) => req.files[field]?.[0]?.filename || null;

            const formData = {
                question, question_type, level, key, minimum_time, option1, option2, option3, option4, solution,
                question_image: extractFilename("question_image"),
                solution_image: extractFilename("solution_image"),
                option1_image: extractFilename("option1_image"),
                option2_image: extractFilename("option2_image"),
                option3_image: extractFilename("option3_image"),
                option4_image: extractFilename("option4_image"),
            };

            console.log("Received form data", formData);
            res.status(200).json({ message: "Question added successfully", data: formData });
        } catch (error) {
            res.status(500).json({ error: "Server error", details: error.message });
        }
    }
);

module.exports = router;
