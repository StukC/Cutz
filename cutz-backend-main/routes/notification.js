const router = require("express").Router();
const {
  createNotification,
  getOrganizationAndEventForNotification,
  getNotificationById,
} = require("../controller/notification");
const { CheckUser } = require("../middleware/checkuser");

router.route("/").post(CheckUser, createNotification);
router.route("/fields").post(CheckUser, getOrganizationAndEventForNotification);
router.route("/:id").get(getNotificationById);
       
module.exports = router;