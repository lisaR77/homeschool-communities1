const mongoose = require('mongoose');
const Joi = require('joi');

const formOneSchema = new mongoose.Schema({
    home_builder: {
        type: Boolean,
        default: false
    },
    commercial_builder: {
        type: Boolean,
        default: false
    },
    company_name: {
        type: String,
        trim: true,
        required: [true, ["company must have a name"]],
        minlength: 3,
        maxlength: 50,
    },
    contact_name: {
        type: String,
        trim: true,
        required: [true, ["contact must have a name"]],
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        trim: true,
        required: [true, ["email must be provided"]],
        unique: false
    },

    phone: {
        type: String,
    }
});

const formTwoSchema = new mongoose.Schema({
    realtor: {
        type: Boolean,
        default: false
    },
    company_name: {
        type: String,
        trim: true,
        required: [true, ["company must have a name"]],
        minlength: 3,
        maxlength: 50,
    },
    contact_name: {
        type: String,
        trim: true,
        required: [true, ["contact must have a name"]],
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        trim: true,
        required: [true, ["email must be provided"]],
        unique: false
    },

    phone: {
        type: String,
    }
});

const formThreeSchema = new mongoose.Schema({
    homeschool: Boolean,
    teacher_or_skilled: Boolean,
    wish_we_had: Boolean,
    advocate_for: Boolean,
    first_name: {
        type: String,
        trim: true,
        required: [true, ["must have a first name"]],
        minlength: 3,
        maxlength: 50,
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, ["must have a last name"]],
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        trim: true,
        required: [true, ["email must be provided"]],
    }
});

function validate(input){
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        
        })
    return schema.validate(input)
}

function validateboth(input){
    const schema = Joi.object({
        commercial_builder: Joi.boolean(),
        home_builder: Joi.boolean(),
        company_name: Joi.string().min(3).required(),
        contact_name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().optional().allow(null,'')

        })
    return schema.validate(input)
}

function validateSecond(input){
    const schema = Joi.object({
        realtor: Joi.boolean(),
        company_name: Joi.string().min(3).required(),
        contact_name: Joi.string().min(3).required(),
        email: Joi.string()
        .email().required(),
        phone: Joi.string().allow(null,'')
        
        })
    return schema.validate(input)
}

function validateThird(input){
    const schema = Joi.object({
        homeschool: Joi.boolean(),
        teacher_or_skilled: Joi.boolean(),
        wish_we_had: Joi.boolean(),
        advocate_for: Joi.boolean(),
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email: Joi.string()
        .email().required(),
        phone: Joi.string().allow(null,'')
        
        })
    return schema.validate(input)
}


exports.formOne = mongoose.model('formOneSchema', formOneSchema);
exports.formTwo = mongoose.model('formTwoSchema', formTwoSchema);
exports.formThree = mongoose.model('formThreeSchema', formThreeSchema);

exports.validate = validate
exports.validateboth = validateboth
exports.validateSecond = validateSecond
exports.validateThird = validateThird
