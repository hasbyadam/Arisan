const catchError = require("../utils/error");
const { Participant, Contact, User } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const { contactId } = req.body;
      const users = [];
      const contact = await Contact.findAll({
        where: { userId: req.user.id },
      });
      for (let i = 0; i < contact.length; i++) {
        const data = await Contact.findOne({
          where: { userId: req.user.id, id: contactId[i] },
        });
        const search = await User.findOne({
          where: { phoneNumber: data.dataValues.phoneNumber },
        });
        const user = {
          userId: search.dataValues.id,
          arisanId: req.params.arisanId,
          haveWon: false,
          havePaid: false,
        };
        users.push(user);
      }
      const participants = await Participant.bulkCreate(users);
      res.status(200).json({
        status: "Success",
        message: "Successfully to create participant",
        result: participants,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  edit: async (req, res) => {
      try {
        const { havePaid } = req.body
        await Participant.update(
            {
              havePaid: havePaid,
            },
            { where: { id: req.params.participantId } }
          );
          res.status(200).json({
            status: "Success",
            message: "Status Changed",
            result: {havePaid: havePaid},
          });
      } catch (error) {
        catchError(error, res);
    }
  },
  filter: async (req, res) => {
    try {
      const { havePaid } = req.body;
      const data = await Participant.findAll({
        where: { havePaid: havePaid },
      });
      res.status(200).json({
        status: "Success",
        message: "participant filtered",
        result: data,
      });
    } catch (error) {
      catchError(error, res);
    }
    },
    remove: async (req, res) => {
        try {
         await Participant.destroy({
            where: { id: req.params.participantId },
          });
          res.status(200).json({
            status: "Success",
            message: "participant deleted",
            result: {},
          });
        } catch (error) {
          catchError(error, res);
        }
    },
    fetchAll: async (req, res) => {
        try {
          const data = await Participant.findAll({
            where: { arisanId: req.params.arisanId },
          });
          res.status(200).json({
            status: "Success",
            message: "participant fetched",
            result: data,
          });
        } catch (error) {
          catchError(error, res);
        }
        },
};
