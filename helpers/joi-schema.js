const Joi = require("joi").extend(require("@joi/date"));

module.exports = {
  registerSchema: Joi.object({
    phoneNumber: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(5)
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])/)
      .message(
        '"password" should contain a mix of uppercase and lowercase letters, numbers, and special characters '
      )
      .required(),
  }),
  loginSchema: Joi.object({
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
  }),
  createArisanSchema: Joi.object({
    title: Joi.string().required(),
    dues: Joi.string().required(),
    paymentPeriod: Joi.required(),
    lotteryDate: Joi.date().required(),
  }),
};
