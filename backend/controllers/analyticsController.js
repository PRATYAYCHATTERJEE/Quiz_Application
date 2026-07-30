const Participant = require("../models/Participant");

// =============================
// GET ANALYTICS DATA
// =============================
exports.getAnalytics = async (req, res) => {

    try {

        // Department-wise Participants
        const departmentStats = await Participant.aggregate([

            {
                $group: {
                    _id: "$department",
                    count: { $sum: 1 }
                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        // Year-wise Participants
        const yearStats = await Participant.aggregate([

            {
                $group: {
                    _id: "$year",
                    count: { $sum: 1 }
                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        res.json({

            success: true,

            departmentStats,

            yearStats

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to load analytics"

        });

    }

};