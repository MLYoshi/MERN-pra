
import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        text: {
            type: String,
            required: [true, "pls add text"]
        }
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Goal', goalSchema);