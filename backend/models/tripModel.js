const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tripSchema = new Schema({

    user:{
     type: Schema.Types.ObjectId,
     ref: 'User',
     required: true
    },

    tripName:{
        type: String,
        required: true
    },

    depature: {
         type: String,
         required: true
    },

    destination: {
        type: String,
        required: true
    },

    depatureDate: {
        type: Date,
        required: true
    },

    returnDate: {
        type: Date,
        required: false
    }
})


module.exports  = mongoose.model('Trip', tripSchema)