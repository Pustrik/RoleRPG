import * as jwt from "jsonwebtoken";
import {token_model} from "../models/token_model";
import dotenv from 'dotenv';
dotenv.config();


    export function generateToken(payload) {
        const access_token = jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '3h'});
        const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '30d'});

        return {access_token, refresh_token};
    }

    export async function saveToken(user_id: string, refresh_token: string) {
        const token_data = await token_model.findOne({user: user_id});
        if (token_data) {
            token_data.refresh_token = refresh_token;
            return await token_data.save();
        }
        const token = await token_model.create({user: user_id, refresh_token: refresh_token});
        return token;
    }

    export async function removeToken(refresh_token: string) {
        const token_data = await token_model.deleteOne({refresh_token: refresh_token});
        return token_data;
    }

    export async function findToken(refresh_token: string) {
        const token_data = await token_model.findOne({refresh_token: refresh_token});
        return token_data;
    }

    export function validateAccessToken(token: string) {
        try {
            const user_data = jwt.verify(token, process.env.JWT_ACCESS);
            return user_data;
        } catch (e) {
            return null;
        }
    }

    export function validateRefreshToken(token: string) {
        try {
            const user_data = jwt.verify(token, process.env.JWT_REFRESH);
            return user_data;
        } catch (e) {
            return null;
        }
    }
