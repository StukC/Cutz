const Client = require('../model/client')
const Otp = require('../model/clientotp')
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')



const SendOtp = async (req, res) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    }
    let transporter = nodemailer.createTransport(config);

    try {
        const client = await Client.findOne({ email: req.body.email })
        if (!client) {
            return res.status(404).json({ message: `No client with email ${req.body.email}` })
        }

        await Otp.findOneAndDelete({ email: req.body.email })
        
        const otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
        let from = `"Cutz" <${process.env.EMAIL}>`
        let info = await transporter.sendMail({
            from: from, // sender address
            to: req.body.email, // ٖ list of receivers 
            subject: "Forget Password OTP", // Subject line
            html: `<p>Here is your OTP :<h2>${otp}</h2></p>`, // html body
        });

        await Otp.create({ email: req.body.email, otp: otp })

        res.status(250).json({
            message: "OTP sent successfully"
        })

    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}




const VerifyOtp = async (req, res) => {
    try {
        const otp = await Otp.findOne({ email: req.body.email })
        if (!otp) {
            return res.status(404).json({ message: 'Otp is not sent to this email' })
        }
        if (otp.otp !== req.body.otp) {
            return res.status(401).json({
                message: "Incorrect Otp"
            })
        }
        await Otp.findOneAndUpdate({ email: req.body.email }, { isVerified: true })
        res.status(200).json({
            message: 'Otp matched successfully'
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}



const ResetPassword = async (req, res) => {
    try {
        const otp = await Otp.findOne({ email: req.body.email })
        if (!otp) {
            return res.status(404).json({ message: 'Otp is not sent to this email' })
        }
        if (!otp.isVerified) {
            return res.status(401).json({
                message: "Your Otp is not verified"
            })
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(401).json({
                message: "Password and confirm password didn't match"
            })
        }
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            await Client.findOneAndUpdate({ email: req.body.email }, { password: hash, confirmPassword: hash })
            res.status(200).json({
                message: 'Password Updated Successfully'
            })
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


module.exports = {
    SendOtp,
    VerifyOtp,
    ResetPassword
}