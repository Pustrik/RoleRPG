import * as mongoose from "mongoose";
import {Schema} from "mongoose";
const user_models = mongoose.Schema;
mongoose.set('strictQuery', false);
const player = new user_models({
    socket_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hp: {
        type: Number,
        required: true
    },
    statuses: {
        type: Array<number>
    }
});

export const player_model = mongoose.model('player', player);