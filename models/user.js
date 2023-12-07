const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { preUpdate, handleMongooseError } = require('./hooks');
const errorMessages = require('../constants/errorMessages');
const { regEx } = require('../constants');

const { phoneRegEx, emailRegEx, dateOfBirthRegEx } = regEx;

const {
  emailRegExErr,
  phoneRegExErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordLengthErr,
  nameRequiredErr,
  dateOfBirthRegExErr,
} = errorMessages;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, nameRequiredErr],
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: [true, passwordRequiredErr],
    },
    email: {
      type: String,
      match: [emailRegEx, emailRegExErr],
      required: [true, emailRequiredErr],
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dcwbkakpl/image/upload/v1701845113/avatars/default_user_avatar_sr0dpz.jpg',
    },
    phone: {
      type: String,
      match: [phoneRegEx, phoneRegExErr],
    },
    dateOfBirth: {
      type: String,
      match: [dateOfBirthRegEx, dateOfBirthRegExErr],
    },
    location: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const signUpSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': nameRequiredErr }),
  lastName: Joi.string(),
  location: Joi.string(),
  dateOfBirth: Joi.string().pattern(dateOfBirthRegEx).messages({
    'string.pattern.base': dateOfBirthRegExErr,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': passwordRequiredErr,
    'string.min': passwordLengthErr,
  }),
  email: Joi.string().pattern(emailRegEx).required().messages({
    'any.required': emailRequiredErr,
    'string.pattern.base': emailRegExErr,
  }),
  phone: Joi.string().pattern(phoneRegEx).messages({
    'string.pattern.base': phoneRegExErr,
  }),
});

const signInSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required': passwordRequiredErr,
    'string.min': passwordLengthErr,
  }),
  email: Joi.string().required().messages({ 'any.required': emailRequiredErr }),
});

const User = model('user', userSchema);

module.exports = { User, signUpSchema, signInSchema };
