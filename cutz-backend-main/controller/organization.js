const Organization = require("../model/organization");
const Admin = require("../model/admin");

const CreateOrganization = async (req, res) => {
  const data = req.body;
  try {
    const organization = await Organization.create({
      organizationName: data.organizationName,
    });
    res.status(201).json({
      message: "Organization added successfully",
      id: organization._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetOrganizations = async (req, res) => {
  try {
    const organization = await Organization.find();
    res.status(200).json(organization);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetAdminOrganizations = async (req, res) => {
  try {
    const organization = await Admin.find().select("organization");
    res.status(200).json(organization);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const GetSingleOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOne({ _id: req.params.id });
    if (!organization) {
      return res
        .status(404)
        .json({ msg: `No organization with id ${req.params.id}` });
    }
    res.status(200).json(organization);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const UpdateOrganization = async (req, res) => {
  const newObj = {};
  for (let i = 0; i < Object.keys(req.body).length; i++) {
    newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i];
  }
  try {
    const organization = await Organization.findOneAndUpdate(
      { _id: req.params.id },
      newObj
    );
    if (!organization) {
      return res
        .status(404)
        .json({ msg: `No organization with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Organization updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

const DeleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOneAndDelete({
      _id: req.params.id,
    });
    if (!organization) {
      return res
        .status(404)
        .json({ msg: `No organization with id ${req.params.id}` });
    }
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  CreateOrganization,
  GetOrganizations,
  GetSingleOrganization,
  UpdateOrganization,
  DeleteOrganization,
  GetAdminOrganizations,
};
