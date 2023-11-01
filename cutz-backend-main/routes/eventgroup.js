const router = require("express").Router();
const {
  CreateEventGroup,
  GetEventGroups,
  GetSingleEventGroup,
  UpdateEventGroup,
  DeleteEventGroup,
  GetEventGroupTimes,
} = require("../controller/eventgroup");

router.route("/").post(CreateEventGroup).get(GetEventGroups);
router
  .route("/:id")
  .get(GetSingleEventGroup)
  .patch(UpdateEventGroup)
  .delete(DeleteEventGroup);
router.route("/count/:id").get(GetEventGroupTimes);

module.exports = router;
