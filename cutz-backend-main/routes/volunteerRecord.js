const router = require("express").Router();
const { GetAllVolunteerRecords } = require("../controller/volunteerrecord");
const { CheckUser } = require("../middleware/checkuser");

router.route("/").get(CheckUser, GetAllVolunteerRecords);

module.exports = router;
