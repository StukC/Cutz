const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const ConnectMongoDB = require("./db/db");
const client = require("./routes/client");
const volunteer = require("./routes/volunteer");
const event = require("./routes/event");
const eventGroup = require("./routes/eventgroup");
const eventReservationClient = require("./routes/eventreservationclient");
const eventReservationVolunteer = require("./routes/eventreservationvolunteer");
const admin = require("./routes/admin");
const businessAdmin = require("./routes/businessadmin");
const owner = require("./routes/owner");
const organization = require("./routes/organization");
const timing = require("./routes/timing");
const forgetpasswordclient = require("./routes/forgetpasswordclient");
const forgetpasswordvolunteer = require("./routes/forgetpasswordvolunteer");
const forgetpasswordadmin = require("./routes/forgetpasswordadmin");
const description = require("./routes/description");
const eventRecord = require("./routes/eventrecord");
const clientRecord = require("./routes/clientrecord");
const volunteerRecord = require("./routes/volunteerrecord");
const notification = require("./routes/notification");
// const upload = require('./routes/upload')
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());
app.use("/images", express.static(__dirname + "/images"));
app.use(express.json());

app.use("/api/v1/client", client);
app.use("/api/v1/volunteer", volunteer);
app.use("/api/v1/event", event);
app.use("/api/v1/eventgroup", eventGroup);
app.use("/api/v1/eventreservationclient", eventReservationClient);
app.use("/api/v1/eventreservationvolunteer", eventReservationVolunteer);
app.use("/api/v1/admin", admin);
app.use("/api/v1/businessadmin", businessAdmin);
app.use("/api/v1/owner", owner);
app.use("/api/v1/organization", organization);
app.use("/api/v1/timing", timing);
app.use("/api/v1/forgetpasswordclient", forgetpasswordclient);
app.use("/api/v1/forgetpasswordvolunteer", forgetpasswordvolunteer);
app.use("/api/v1/forgetpasswordadmin", forgetpasswordadmin);
app.use("/api/v1/description", description);
app.use("/api/v1/eventRecord", eventRecord);
app.use("/api/v1/clientRecord", clientRecord);
app.use("/api/v1/volunteerRecord", volunteerRecord);
app.use("/api/v1/notification", notification);

// Get All Images

app.get("/api/v1/getimages", (req, res) => {
  const directoryPath = path.join(__dirname, "images");
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(files);
  });
});

// Upload Image

const storageEngine = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
});

app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    res.json({
      message: "Image uploaded successfully",
      link: "/images/" + req.file.filename,
    });
  } else {
    res.status(400).json({
      message: "Please upload a valid image",
    });
  }
});

app.get("/", (req, res) => {
  res.send({ message: "welcome to events API!!" });
});

ConnectMongoDB(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`Listening on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error => ", err);
  });
