const Notification = require("../model/notification");
const Event = require("../model/events");
const Admin = require("../model/admin");

const createNotification = async (req, res) => {
  try {
    const admin = await Notification.create({
      organization: req.body.organization,
      eventType: req.body.eventType,
      notificationText: req.body.notificationText,
      eventLocation: req.body.eventLocation || "",
    });
    res.status(201).json({
      message: "Notification created successfully",
      id: admin._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const getOrganizationAndEventForNotification = async (req, res) => {
  const organizations = await Admin.find().select("organization");
  const organizationsList =
    req.body.organization || organizations.map((result) => result.organization);

  Event.find()
    .populate({
      path: "orgId",
      match: { organizationName: { $in: organizationsList } },
    })
    .then(function (events) {
      events = events.filter(function (event) {
        return event.orgId;
      });
      res.status(200).json({
        organizations: organizationsList,
        events: events,
      });
    })
    .catch(function (err) {
      res.json(err);
    });
};

module.exports = {
  createNotification,
  getOrganizationAndEventForNotification,
};
