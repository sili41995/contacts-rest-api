const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { preUpdate, handleMongooseError } = require('./hooks');
const errorMessages = require('../constants/errorMessages');
const { regEx } = require('../constants');

const { phoneRegEx, emailRegEx } = regEx;

const { emailRegExErr, phoneRegExErr, phoneRequiredErr, nameRequiredErr } =
  errorMessages;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, nameRequiredErr] },
    email: {
      type: String,
      match: [emailRegEx, emailRegExErr],
    },
    phone: {
      type: String,
      match: [phoneRegEx, phoneRegExErr],
      required: [true, phoneRequiredErr],
    },
    favorite: { type: Boolean, default: false },
    tgUsername: String,
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dcwbkakpl/image/upload/v1701845114/avatars/default_contact_avatar_jpghh4.jpg',
    },
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
  name: Joi.string().required().messages({ 'any.required': nameRequiredErr }),
  email: Joi.string().pattern(emailRegEx).messages({
    'string.pattern.base': emailRegExErr,
  }),
  phone: Joi.string().pattern(phoneRegEx).required().messages({
    'any.required': phoneRequiredErr,
    'string.pattern.base': phoneRegExErr,
  }),
  favorite: Joi.boolean(),
  tgUsername: Joi.string(),
});

const updateSchema = Joi.object()
  .min(1)
  .messages({ 'object.min': 'Missing fields' });

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
