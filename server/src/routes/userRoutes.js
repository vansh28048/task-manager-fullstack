
const express = require("express");
const router = express.Router();

const { getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.use(authMiddleware); // Protect all user routes
router.get("/profile", getProfile);
router.put("/profile", upload.single("profileImage"), updateProfile);

module.exports = router;
