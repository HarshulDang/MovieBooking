import mongoose from "mongoose";

const TheatreSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Movie: {type: String,required:true},
    ShowTime:{type: String,required:true},
    Seat: { type: Number, default: 50 },
    Price: { type: Number, default: 200 }
});

export default mongoose.model("Theatre", TheatreSchema);
