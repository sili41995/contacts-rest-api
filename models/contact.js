// номер телефона email заменить на рег. выр.
const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { preUpdate, handleMongooseError } = require('./hooks');

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'] },
    email: String,
    phone: { type: String, required: [true, 'Set phone for contact'] },
    favorite: { type: Boolean, default: false },
    tg_username: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.pre('findOneAndUpdate', preUpdate);
contactSchema.post('save', handleMongooseError);
contactSchema.post('findOneAndUpdate', handleMongooseError);

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

const updateSchema = Joi.object()
  .min(1)
  .messages({ 'object.min': 'missing fields' });

const updateStatusContactSchema = Joi.object()
  .keys({
    favorite: Joi.boolean(),
  })
  .messages({
    'object.unknown': 'An unexpected property was found in the object',
  });

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  addSchema,
  updateSchema,
  updateStatusContactSchema,
};
