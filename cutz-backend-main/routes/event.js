const router = require("express").Router();
const {
  CreateEvent,
  GetEvents,
  GetSingleEvent,
  UpdateEvent,
  DeleteEvent,
  getHomeScreenData,
} = require("../controller/event");

router.route("/").post(CreateEvent).get(GetEvents);
router.route("/home/:id").get(getHomeScreenData);
router.route("/:id").get(GetSingleEvent).patch(UpdateEvent).delete(DeleteEvent);

module.exports = router;
