// номер телефона email заменить на рег. выр.
const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils');
const Joi = require('joi');

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'] },
    email: String,
    phone: { type: String, required: [true, 'Set phone for contact'] },
    favorite: { type: Boolean, default: false },
    tg_username: String,
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  email: Joi.string(),
  phone: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required phone field' }),
  favorite: Joi.boolean(),
  tg_username: Joi.string(),
});

contactSchema.post('save', handleMongooseError);

const Contact = model('contact', contactSchema);

module.exports = { Contact, addSchema };
