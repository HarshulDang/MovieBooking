import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    Movie: String,
    UserReviews: [
        {
            By: {
                type: String,
                required: true,
                lowercase: true
            },
            View: {
                type: String,
                lowercase: true
            }
        }
    ]
});

export default mongoose.model("Review", ReviewSchema);
