const { Arisan } = require("../models");
const catchError = require("../utils/error");
const moment = require("moment");

module.exports = {
  createArisan: async (req, res) => {
    const body = req.body;
    try {
      const arisan = await Arisan.create({
        title: body.title,
        dues: body.dues,
        paymentPeriod: body.paymentPeriod,
        customDate: body.customDate,
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
};
