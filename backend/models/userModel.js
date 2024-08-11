import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "pls add name"]
        },
        email: {
            type: String,
            required: [true, "pls add email"]
        },
        password: {
            type: String,
            required: [true, "pls add password"]
        }
    },
    {
        timestamps: true
    }

)

export default mongoose.model('User',userSchema);