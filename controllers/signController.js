const { User }= require("../models")
const jwt = require('jsonwebtoken')
const catchError = require('../utils/error')
const bcrypt = require('bcrypt')
const { sendEmail } = require('../helpers/emailSender') 

module.exports = {
    register: async (req, res) => {
        const body = req.body;
        try {
            const check = await User.findOne({
                where: {
                    email: body.email,
                },
            });
            if (check) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: "Email already exists",
                });
            }
            const hashedPassword = await bcrypt.hash(body.password, 10);
            const user = await User.create({
                phoneNumber: body.phoneNumber,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                password: hashedPassword,
            });
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" }
            );
            await sendEmail(user.email, "registration success", `Welcome ${user.firstName}`);
            res.status(200).json({
                status: "Success",
                message: "Successfully to create an account",
                result: {
                    token,
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        image: user.image,
                    },
                },
            });
        } catch (error) {
            catchError(error, res);
        }
    },
    login: async (req, res) => {
        const { phoneNumber, password } = req.body;
        try {
            const user = await User.findOne({
                where: {
                    phoneNumber,
                },
            });
            if (!user) {
                return res.status(401).json({
                    status: "Unauthorized",
                    message: "Invalid phoneNumber and password combination",
                });
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return res.status(401).json({
                    status: "Unauthorized",
                    message: "Invalid phoneNumber and password combination",
                    result: {},
                });
            }
            const token = jwt.sign(
                {
                    id: user.id,
                },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" }
            );
  
            res.status(200).json({
                status: "Success",
                message: "Logged in successfully",
                result: {
                    token,
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        image: user.image,
                    },
                },
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}