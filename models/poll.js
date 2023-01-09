const mongoose = require('mongoose');
const Joi = require('joi')

const pollSchema = new mongoose.Schema({
    ipId: {
        type: String,
        required: true,
    },
    homeschool_communities: {
        type: Boolean,
        default: false
    },
    existing_community: {
        type: Boolean,
        default: false
    },
    build_this: {
        type: Boolean,
        default: false
    },
    live_here: {
        type: Boolean,
        default: false
    },
    serve_here: {
        type: Boolean,
        default: false
    },

    my_clients: {
        type: Boolean,
        default: false
    }
});





exports.Poll = mongoose.model('poll', pollSchema);


// exports.validate = validate
