// номер телефона email заменить на рег. выр.
const { Schema, model } = require('mongoose');
const { preUpdate, handleMongooseError } = require('./hooks');
const Joi = require('joi');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dcwbkakpl/image/upload/v1701845113/avatars/default_user_avatar_sr0dpz.jpg',
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
  firstName: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required first name field' }),
  lastName: Joi.string(),
  password: Joi.string().min(6).required().messages({
    'any.required': 'missing required password field',
    'string.min': 'Password length must be at least 6 characters long',
  }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
});

const signInSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    'any.required': 'missing required password field',
    'string.min': 'Password length must be at least 6 characters long',
  }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
});

const User = model('user', userSchema);

module.exports = { User, signUpSchema, signInSchema };
