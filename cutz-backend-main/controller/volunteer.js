const Volunteer = require("../model/volunteer");
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VolunteerRecord = require("../model/volunteersrecord");
const EventReservationVolunteer = require("../model/eventreservationvolunteer");

const SignUpVolunteer = async (req, res) => {
  const user = await Volunteer.find({ email: req.body.email });
  if (user.length) {
    await Volunteer.findOneAndUpdate(
      { email: req.body.email },
      { volunteerExists: true }
    );
    return res
      .status(409)
      .json({ message: "User Already Exists", volunteerExists: true });
  } else {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        try {
          if (req.body.password !== req.body.confirmPassword) {
            return res.status(401).json({
              error: "password and confirm password didn't match",
            });
          }
          const volunteer = await Volunteer.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            confirmPassword: hash,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            employer: req.body.employer ? req.body.employer : "",
            organization: req.body.organization ? req.body.organization : "",
            // activeStatus: req.body.activeStatus,
            // clientStatus: req.body.clientStatus,
            volunteerAttandance: req.body.volunteerAttandance,
          });
          const token = jwt.sign(
            {
              email: volunteer.email,
              userId: volunteer._id,
            },
            process.env.JWT_KEY
          );
          res.status(201).json({
            message: "User created successfully",
            token,
            volunteerExists: false,
            id: volunteer._id,
            userDetails: volunteer,
          });
        } catch (err) {
          res.status(500).json({
            error: err,
          });
        }
      }
    });
  }
};

const LoginVolunteer = async (req, res) => {
  try {
    const user = await Volunteer.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        message: "Auth Failed",
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      // if (req.body.password !== user.password) {
      //     return res.status(401).json({
      //         message: "Auth Failed"
      //     })
      // }
      if (result) {
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          process.env.JWT_KEY
        );
        return res.status(200).json({
          messagae: "Auth Successful",
          token: token,
          id: user._id,
          userDetails: user,
        });
      }
      res.status(401).json({
        message: "Auth Failed",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetAllVolunteers = async (req, res) => {
  const userData = req.userData;

  try {
    // const admin = await Admin.findOne({ _id: userData.adminId })
    // if (!admin) {
    //     return res.status(401).json({
    //         message: 'auth token invalid'
    //     })
    // }

    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetVolunteer = async (req, res) => {
  const userData = req.userData;

  try {
    // const user = await Volunteer.findOne({ _id: userId })
    const user = await Volunteer.findOne({ _id: userData.userId });
    const admin = await Admin.findOne({ _id: userData.adminId });
    if (!user && !admin) {
      return res.status(401).json({
        message: "auth token invalid",
      });
    }
    if (user) {
      res.status(200).json(user);
    } else {
      const user = await Volunteer.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No volunteer with id ${req.params.id}` });
      }
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const DeleteVolunteer = async (req, res) => {
  const userData = req.userData;
  try {
    const user = await Volunteer.findOne({ _id: userData.userId });
    const admin = await Admin.findOne({ _id: userData.adminId });

    if (!user && !admin) {
      return res.status(401).json({
        message: "auth token invalid",
      });
    }
    if (user) {
      const user = await Volunteer.findOneAndDelete({ _id: userData.userId });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      const user = await Volunteer.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No volunteer with id ${req.params.id}` });
      }
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const UpdateVolunteer = async (req, res) => {
  const userData = req.userData;
  const newObj = {};
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    if (Object.keys(req.body)[i] == "password") {
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(401).json({
          error: "password and confirm password didn't match",
        });
      }
      try {
        let hash = await bcrypt.hash(Object.values(req.body)[i], 10);
        newObj["password"] = hash;
        newObj["confirmPassword"] = hash;
        continue;
      } catch (err) {
        return res.status(500).json({
          error: err,
        });
      }
    }
    if (Object.keys(req.body)[i] !== "confirmPassword") {
      newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i];
    }
  }
  try {
    const user = await Volunteer.findOne({ _id: userData.userId });
    const admin = await Admin.findOne({ _id: userData.adminId });
    // const user = await Volunteer.findOneAndUpdate({ _id: userId }, newObj)
    if (!user && !admin) {
      return res.status(401).json({
        message: "auth token invalid",
      });
    }
    if (user) {
      const user = await Volunteer.findOneAndUpdate(
        { _id: userData.userId },
        newObj
      );
      res.status(200).json({ message: "User updated successfully" });
    } else {
      const user = await Volunteer.findOneAndUpdate(
        { _id: req.params.id },
        newObj
      );
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No volunteer with id ${req.params.id}` });
      }
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// const ForgetPassword = async (req, res) => {
//     if (req.body.password !== req.body.confirmPassword) {
//         return res.status(401).json({ messaage: "Password and confirm password didn't match" })
//     }
//     try {
//         const user = await Volunteer.findOneAndUpdate({ email: req.body.email }, { password: req.body.password, confirmPassword: req.body.confirmPassword })
//         if (!user) {
//             return res.status(404).json({
//                 message: 'No user found with the email'
//             })
//         }
//         res.status(200).json({ message: 'Password updated successfully' })
//     }
//     catch (err) {
//         res.status(500).json({
//             error: err
//         })
//     }
// }

module.exports = {
  SignUpVolunteer,
  LoginVolunteer,
  GetAllVolunteers,
  GetVolunteer,
  UpdateVolunteer,
  DeleteVolunteer,
};
