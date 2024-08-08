
import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
    {
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