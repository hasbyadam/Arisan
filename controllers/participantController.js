const catchError = require("../utils/error");
const { Participant, Contact, User } = require('../models')

module.exports = {
    create: async (req, res) => {
        try {
            const { contactId } = req.body
            const users = []
            const contact = await Contact.findAll({
                where: { userId: req.user.id },
            })
            for (let i = 0; i < contact.length; i++) {
                const data = await Contact.findOne({
                    where: { userId: req.user.id, id: contactId[i] },
                })
                const search = await User.findOne({
                    where: { phoneNumber: data.dataValues.phoneNumber }
                })
                const user = { userId: search.dataValues.id, arisanId: req.params.arisanId, haveWon: false, havePaid:false }
                users.push(user)
            }
            const participants = await Participant.bulkCreate(users)
            res.status(200).json({
                status: "Success",
                message: "Successfully to create participant",
                result: participants,
              });
        } catch (error) {
            catchError(error,res)
        }
}
}

