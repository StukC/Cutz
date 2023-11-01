const router = require("express").Router();
const { GetAllClientRecords } = require("../controller/clientrecord");
const { CheckUser } = require("../middleware/checkuser");

router.route("/").get(CheckUser, GetAllClientRecords);

module.exports = router;
