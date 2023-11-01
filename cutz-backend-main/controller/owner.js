const Owner = require('../model/owner')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const SignUpOwner = async (req, res) => {
    const owner = await Owner.find({ email: req.body.email })
    if (owner.length) {
        return res.status(409).json({ message: "Owner Already Exists" })
    }
    else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            else {
                try {
                    const owner = await Owner.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phoneNumber: req.body.phoneNumber,
                        address: req.body.address,
                    })
                    res.status(201).json({
                        message: 'Owner created successfully',
                        id: owner._id
                    })
                }
                catch (err) {
                    res.status(500).json({
                        error: err
                    })
                }
            }
        })
    }
}




const LoginOwner = async (req, res) => {
    try {
        const owner = await Owner.findOne({ email: req.body.email })
        if (!owner) {
            return res.status(401).json({
                message: "Auth Failed"
            })
        }
        bcrypt.compare(req.body.password, owner.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            if (result) {
                const token = jwt.sign(
                    {
                        email: owner.email,
                        adminId: owner._id
                    },
                    process.env.JWT_KEY
                )
                return res.status(200).json({
                    messagae: "Auth Successful",
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth Failed"
            })
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




const GetAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find()
        res.status(200).json(owners)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }

}




const GetOwner = async (req, res) => {
    const adminId = req.userData.adminId
    try {
        const owner = await Owner.findOne({ _id: adminId })
        if (!owner) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json(owner)
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


const DeleteOwner = async (req, res) => {
    const adminId = req.userData.adminId
    try {
        const owner = await Owner.findOneAndDelete({ _id: adminId })
        if (!owner) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json({ message: 'Owner deleted successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




const UpdateOwner = async (req, res) => {
    const adminId = req.userData.adminId
    const newObj = {}
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i]
    }
    try {
        const owner = await Owner.findOneAndUpdate({ _id: adminId }, newObj)
        if (!owner) {
            return res.status(401).json({
                message: 'auth token invalid'
            })
        }
        res.status(200).json({ message: 'Owner updated successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}







module.exports = {
    SignUpOwner,
    LoginOwner,
    GetAllOwners,
    GetOwner,
    UpdateOwner,
    DeleteOwner
}