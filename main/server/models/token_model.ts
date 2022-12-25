import mongoose, {Schema} from "mongoose";

const token_models = mongoose.Schema;
const token = new token_models({
    user: {
        type: Schema.Types.ObjectId, ref: 'user',
        required: true,
    },
    refresh_token: {
        type: String,
        required: true
    },
});

export const token_model = mongoose.model('token', token);