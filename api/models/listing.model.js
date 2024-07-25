import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        duration:{
            type: Number,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        imageURLs:{
            type: Array, 
            required: true,
        },
        userRef:{
            type: String,
            required: true,
        },
    },{timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;