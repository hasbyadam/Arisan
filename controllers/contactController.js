const catchError = require("../utils/error");
const { Contact, User } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, phoneNumber, email } = await req.body;
      const { id } = await req.user;
      const data = await Contact.create({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        userId: id,
      });
      const check = await User.findOne({
        where: { email: email },
      });

      if (!check) {
        await User.create({
          phoneNumber: phoneNumber,
          email: email,
          active: false,
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Successfully to create contact",
        result: data,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  edit: async (req, res) => {
    try {
      const { name, phoneNumber, email } = await req.body;
      await Contact.update(
        {
          name: name,
          phoneNumber: phoneNumber,
          email: email,
        },
        {
          where: {
            userId: req.user.id,
            id: req.params.id,
          },
        }
      );
      res.status(200).json({
        status: "Success",
        message: "Successfully to updated contact",
        result: {},
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  remove: async (req, res) => {
    try {
      await Contact.destroy({
        where: {
          userId: req.user.id,
          id: req.params.id,
        },
      });
      res.status(200).json({
        status: "Success",
        message: "Successfully to delete contact",
        result: {},
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  fetchAll: async (req, res) => {
    try {
      const data = await Contact.findAll({
        where: {
          userId: req.user.id,
        },
      });
      if (data.length == 0)
        return res.status(200).json({
          status: "Success",
          message: "Contact Empty",
          result: data,
        });
      res.status(200).json({
        status: "Success",
        message: "Successfully to fetch contact",
        result: data,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
};
