const router = require("express").Router();
const {
  CreateEventRecord,
  GetEventRecords,
  GetSingleEvent,
  UpdateEvent,
} = require("../controller/eventrecord");

router.route("/").post(CreateEventRecord).get(GetEventRecords);
router.route("/:id").get(GetSingleEvent).patch(UpdateEvent);

module.exports = router;
