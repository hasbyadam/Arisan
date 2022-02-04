const { Arisan } = require("../models");
const catchError = require("../utils/error");
const moment = require("moment");

module.exports = {
  createArisan: async (req, res) => {
    const body = req.body;
    const { payment, period } = req.query;
    try {
      let today = new Date(),
        y = today.getFullYear(),
        m = today.getMonth(),
        d = today.getDate();

      let lotteryTime;
      let lotteryPeriode;
      switch (period) {
        case firstWeek:
          {
            lotteryTime = moment().add(6, "days").format("LLLL").toDate();
            lotteryPeriode = lotteryTime;
          }
          break;
      }

      let paymentQuery;
      if (payment) {
        paymentQuery = {
          paymentPeriod: payment,
        };
      }

      const arisan = await Arisan.create({
        title: body.title,
        dues: body.dues,
        paymentPeriod: paymentQuery,
        lotteryDate: lotteryPeriode,
      });

      if (!arisan) {
        return res.status(500).json({
          status: "Internal Server Error",
          message: "Failed to save data to database",
          result: {},
        });
      }
      res.status(201).json({
        status: "success",
        message: "successfully created event",
        result: arisan,
      });
    } catch (error) {
      catchError(error, res);
    }
  },
};
