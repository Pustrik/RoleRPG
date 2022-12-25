import * as mongoose from "mongoose";
const user_models = mongoose.Schema;
mongoose.set('strictQuery', false);
const user = new user_models({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

export const user_model = mongoose.model('user', user);
