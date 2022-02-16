const catchError = require("../utils/error");
const { Participant, Contact, User, Arisan } = require("../models");

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

      const arisan = await Arisan.findOne({
        where: {
          id: req.params.arisanId
        }
      })
      const totalParticipant = arisan.dataValues.totalParticipant + users.length
      console.log(totalParticipant)
      await Arisan.update(
        {
          totalParticipant: totalParticipant
        },
        {
          where: {
            id: req.params.arisanId 
          } 
        }
      )

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

      const test = await Participant.findOne({
        where: { id: req.params.participantId },
        include:
            {
              model: Arisan,
              as: "arisan",
              attributes: ["dues", "balance", "id"],
            }
      })

      const { havePaid } = req.body;
      await Participant.update(
        {
          havePaid: havePaid,
        },
        {
          where: {
            id: req.params.participantId,
          },
          returning: true
        }
      );
      
      if (test.havePaid == havePaid)
        return  res.status(400).json({
          status: "Failed",
          message: "ga boleh sama",
          result: {},
        });
      
      let dues = test.dataValues.arisan.dataValues.dues
      let balance = test.dataValues.arisan.dataValues.balance
      if (havePaid) {
        balance += dues 
      }
      else {
        balance -= dues 
      }
        const result  = await Arisan.update({
          balance: balance
        },
          {
            where: {
            id: test.dataValues.arisan.dataValues.id
            },
            returning:true
        })
      
      res.status(200).json({
        status: "Success",
        message: "Status Changed",
        result: result[1][0].dataValues,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  filter: async (req, res) => {
    try {
      const { havePaid } = req.body;
      const data = await Participant.findAll({
        where: { havePaid: havePaid, arisanId: req.params.arisanId },
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
