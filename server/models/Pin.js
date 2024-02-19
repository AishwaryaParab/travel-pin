import mongoose from "mongoose";

const pinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    title: {
        type: String,
        required: true,
        min: 3
    },
    desc: {
        type: String,
        required: true,
        min: 3
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
}, {timestamps: true})

const Pin = mongoose.model('Pin', pinSchema);

export default Pin;