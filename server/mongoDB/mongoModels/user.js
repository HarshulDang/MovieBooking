import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true
    },
    PasswordHash: {
        type: String,
        required: true
    },
    Bookings: [
        {
            Movie: String,
            TheatreName: String,
            ShowTime: String,
            Price: Number,
            Seat: Number,
            Date: Date
        }
    ]
});

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.PasswordHash);
};

UserSchema.methods.generateJWToken = function() {
    return jwt.sign(
        {
            email: this.Email
        },
        process.env.JWTKEY
    );
};

UserSchema.methods.toValidAuthJSON = function() {
    return {
        email: this.Email,
        bookings: this.Bookings,
        token: this.generateJWToken()
    };
};

UserSchema.methods.setPassword = function(password) {
    this.PasswordHash = bcrypt.hashSync(password, 10);
};

UserSchema.plugin(uniqueValidator);
export default mongoose.model("User", UserSchema);
