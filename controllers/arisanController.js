const { Arisan, Participant } = require("../models");
const catchError = require("../utils/error");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = {
  createArisan: async (req, res) => {
    const body = req.body;
    let user_id = req.user.id;
    try {
      const arisan = await Arisan.create({
        ...body,
        userId: user_id,
      });
      const arisanmember = await Participant.create({
        userId: user_id,
        arisanId: arisan.dataValues.id,
        haveWon: false,
      });
      if (!arisan) {
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Failed to save data to database",
          result: {},
        });
      }
      res.status(201).json({
        status: "Success",
        message: "Successfully created event",
        result: arisan,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  getArisans: async (req, res) => {
    try {
      const arisan = await Arisan.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
      });
      if (arisan.length == 0) {
        return res.status(404).json({
          status: "Not Found",
          message: "Data does not exist!",
          result: {},
        });
      }
      res.status(200).json({
        status: "success",
        message: "Arisan successfully retrieved",
        result: arisan,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  getArisan: async (req, res) => {
    const { arisanId } = req.params;
    try {
      const arisan = await Arisan.findByPk(arisanId);
      if (!arisan) {
        return res.status(404).json({
          status: "Not Found",
          message: "Data does not exist!",
          result: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Arisan successfully retrieved",
        result: arisan,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  updateArisan: async (req, res) => {
    const { arisanId } = req.params;
    const body = req.body;
    try {
      const checkUpdate = await Arisan.update(body, {
        where: {
          id: arisanId,
        },
      });
      if (checkUpdate[0] != 1) {
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Failed to update arisan",
          result: {},
        });
      }

      const updatedArisan = await Arisan.findByPk(arisanId);
      res.status(201).json({
        status: "Success",
        message: "Arisan successfully updated",
        result: updatedArisan,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  deleteArisan: async (req, res) => {
    const { arisanId } = req.params;
    try {
      const arisan = await Arisan.destroy({
        where: {
          id: arisanId,
        },
      });
      if (!arisan) {
        return res.status(404).json({
          status: "Not Found",
          message: "Data does not exist!",
          result: {},
        });
      }
      res.status(200).json({
        status: "Success",
        message: "Arisan successfully deleted",
        result: {},
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  filterArisan: async (req, res) => {
    const { order } = req.query;
    try {
      let sort;
      switch (order) {
        case "ztoa":
          sort = [["title", "DESC"]];
          break;
        case "anggota":
          sort = [["totalParticipant", "DESC"]];
          break;
        default:
          {
            sort = [["title", "ASC"]];
          }
          break;
      }

      const arisan = await Arisan.findAll({
        order: sort,
      });

      if (!arisan) {
        return res.status(404).json({
          status: "Not Found",
          message: "Data does not exist!",
          result: {},
        });
      }
      res.status(200).json({
        status: "success",
        message: "Arisan successfully retrieved",
        result: arisan,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
  searchArisan: async (req, res) => {
    try {
      const findArisan = await Arisan.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${req.query.title}%`,
              },
            },
            {
              idArisan: {
                [Op.iLike]: `%${req.query.idArisan}%`,
              },
            },
          ],
        },
      });
      if (!findArisan) {
        return res.status(404).json({
          status: "Not Found",
          message: "Data does not exist!",
          result: {},
        });
      }
      res.status(200).json({
        status: "success",
        message: "Arisan successfully retrieved",
        result: findArisan,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
};
