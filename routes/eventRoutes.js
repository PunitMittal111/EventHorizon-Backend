const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const eventController = require("../controllers/eventController");
const { protect } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/", protect, eventController.getEvents);
router.get("/:id", protect, eventController.getEventById);
router.post("/", protect, eventController.createEvent);
router.put("/:id", protect, eventController.updateEvent);
router.delete("/:id", protect, eventController.deleteEvent);

router.post("/upload", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ url: imageUrl });
});

module.exports = router;
