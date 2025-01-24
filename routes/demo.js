const express = require("express");
const router = express.Router();
const db = require("../database");
const multer = require("multer");

// Multer configuration for file uploads
const imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const modifiedName = originalName.replace(/\s+/g, "_"); // Replace spaces with underscores
    callback(null, `image-${Date.now()}-${modifiedName}`); // Corrected template literal
  },
});

// File filter function
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, false); // Passing false instead of an Error object
  }
};

// Multer instance for file uploads
const upload = multer({
  storage: imgConfig,
  fileFilter: isImage,
});

// Middleware to handle form data parsing
router.use(express.urlencoded({ extended: false }));

// GET route for rendering a demo page
router.get("/demo", (req, res) => {
  res.render("demo");
});

// POST route for handling file uploads and form data submission
router.post(
  "/upload/:chapterid",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  (req, res) => {
    console.log("route is excuted");
    console.log("Files:", req.files); // Log uploaded files
    console.log("Body:", req.body); // Log form data

    const { question } = req.body;
    console.log(question);
    const chapter_id = req.params.chapterid;
    console.log(chapter_id);

    if (!question) {
      return res.status(400).json({ error: "Question text is required" });
    }

    const file1Path = req.files["file1"] ? req.files["file1"][0].path : null;
    const file2Path = req.files["file2"] ? req.files["file2"][0].path : null;
    console.log("insertion begin");
    const query =
      "INSERT INTO demo (question, chapter_id, filepath1, filepath2) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [question, chapter_id, file1Path, file2Path],
      (err, result) => {
        if (err) {
          console.error("Database error:", err);
          return res
            .status(500)
            .json({ error: "Failed to insert data into the database" });
        }
        res
          .status(201)
          .json({ message: "Data inserted successfully", data: result });
      }
    );
  }
);

module.exports = router;

