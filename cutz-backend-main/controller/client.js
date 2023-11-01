const Client = require("../model/client");
const Admin = require("../model/admin");
const ClientRecord = require("../model/clientsrecord");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EventReservationClient = require("../model/eventreservationclient");

const SignUpClient = async (req, res) => {
  const checkclient = await Client.find({ email: req.body.email });
  if (checkclient.length) {
    await Client.findOneAndUpdate(
      { email: req.body.email },
      { clientExists: true }
    );
    return res
      .status(409)
      .json({ message: "User Already Exists", clientExists: true });
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
          const user = await Client.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            confirmPassword: hash,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            familySize: req.body.familySize,
            // activeStatus: req.body.activeStatus,
            // clientStatus: req.body.clientStatus,
            clientAttandance: req.body.clientAttandance,
          });
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_KEY
          );
          res.status(201).json({
            message: "User created successfully",
            token,
            clientExists: false,
            id: user._id,
            userDetails: user,
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

const LoginClient = async (req, res) => {
  try {
    const user = await Client.findOne({ email: req.body.email });
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

const GetAllClients = async (req, res) => {
  const userData = req.userData;
  try {
    // const admin = await Admin.findOne({ _id: userData.adminId })
    // if (!admin) {
    //     return res.status(401).json({
    //         message: 'auth token invalid'
    //     })
    // }
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetClient = async (req, res) => {
  const userData = req.userData;
  try {
    const user = await Client.findOne({ _id: userData.userId });
    const admin = await Admin.findOne({ _id: userData.adminId });
    if (!user && !admin) {
      return res.status(401).json({
        message: "auth token invalid",
      });
    }
    if (user) {
      res.status(200).json(user);
    } else {
      const user = await Client.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No client with id ${req.params.id}` });
      }
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const DeleteClient = async (req, res) => {
  const userData = req.userData;
  try {
    const user = await Client.findOne({ _id: userData.userId });

    const admin = await Admin.findOne({ _id: userData.adminId });
    // const user = await Client.findOneAndDelete({ _id: userId })
    if (!user && !admin) {
      return res.status(401).json({
        message: "auth token invalid",
      });
    }
    if (user) {
      const user = await Client.findOneAndDelete({ _id: userData.userId });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      const user = await Client.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No client with id ${req.params.id}` });
      }
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const UpdateClient = async (req, res) => {
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
    const user = await Client.findOne({ _id: userData.userId });
    const admin = await Admin.findOne({ _id: userData.adminId });
    // const user = await Client.findOneAndUpdate({ _id: userId }, newObj)
    if (!user && !admin) {
      return res.status(401).json({
        message: "auth token invalid",
      });
    }
    if (user) {
      const user = await Client.findOneAndUpdate(
        { _id: userData.userId },
        newObj
      );
      res.status(200).json({ message: "User updated successfully" });
    } else {
      const user = await Client.findOneAndUpdate(
        { _id: req.params.id },
        newObj
      );
      if (!user) {
        return res
          .status(404)
          .json({ msg: `No client with id ${req.params.id}` });
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
//         const user = await Client.findOneAndUpdate({ email: req.body.email }, { password: req.body.password, confirmPassword: req.body.confirmPassword })
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
  SignUpClient,
  LoginClient,
  GetAllClients,
  GetClient,
  UpdateClient,
  DeleteClient,
};
