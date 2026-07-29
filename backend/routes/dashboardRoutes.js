const express = require("express");

const router = express.Router();

const {
    getDashboardStats,
    restoreDashboard
} = require("../controllers/dashboardController");

router.get("/stats", getDashboardStats);
router.post("/restore", restoreDashboard);
module.exports = router;