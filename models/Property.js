const mongoose = require('mongoose');


const PropertySchema = new mongoose.Schema({
    title: {type:String, required: true},
    type: String,
    price: {type:Number, required:true},
    state: String,
    city: String, 
    areaSqFt: Number,
    bedrooms: Number,
    bathrooms: Number,
    amenities: [String],
    furnished: String,
    availableFrom: Date,
    listedBy: {type:String},
    tags: [String],
    colorTheme: String,
    rating: {
        type: Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    listingType:{
        type: String,
        enum:['rent','sale']
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps:true});

module.exports = mongoose.model('Property',PropertySchema);

