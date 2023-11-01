const router = require("express").Router();
const {
  createNotification,
  getOrganizationAndEventForNotification,
} = require("../controller/notification");
const { CheckUser } = require("../middleware/checkuser");

router.route("/").post(CheckUser, createNotification);
router.route("/fields").post(CheckUser, getOrganizationAndEventForNotification);

module.exports = router;
