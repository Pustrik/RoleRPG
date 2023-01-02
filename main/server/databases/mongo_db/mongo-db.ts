import * as mongoDB from "mongoose";
import dotenv from 'dotenv';
import player_model from "./models/player-model";
dotenv.config();

mongoDB.set('strictQuery', false);
function connectMongo() {
    mongoDB.connect(process.env.MONGODB_URL)
        .then(() => console.log('Connected to mongoDB'))
        .catch((e) => console.log('Cant connect to mongoDB'));
    clearAll();
}
async function clearAll() {
    await player_model.deleteOne();
}
export default connectMongo;