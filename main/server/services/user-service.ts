import user_model from "../databases/mongo_db/models/user-model";
import * as bcrypt from 'bcrypt';
import {findToken, removeToken, userTokens, validateRefreshToken} from "./token-service";
import ApiError from "../exteptions/api-exceptions";
import {addUser, getUserById, updateUser} from "./pdb-service";

export async function registration(username: string, email: string, password: string, class_id: string) {
    const candidate = await user_model.findOne({username: username});
    if(candidate)
        throw ApiError.badRequest('User exist');

    const hash = bcrypt.hashSync(password, 5);
    const user = await user_model.create({username: username, password: hash});
    const user_pdg = await addUser(user.id, username, email, hash, class_id);
    return await userTokens(user);
}
export async function login(username: string, password: string) {
    const user = await user_model.findOne({username});
    if(!user)
        throw ApiError.badRequest('User does not exist');
    const is_equal = bcrypt.compareSync(password, user.password);
    if(!is_equal)
        throw ApiError.badRequest('Wrong password');
    return await userTokens(user);
}

export async function logout(refresh_token: string) {
    return await removeToken(refresh_token);
}

export async function refresh(refresh_token: string) {
    if(!refresh_token)
        throw ApiError.unauthorizedError();
    const user_data = validateRefreshToken(refresh_token);
    const token_from_db = await findToken(refresh_token);
    if(!user_data || !token_from_db)
        throw ApiError.unauthorizedError();
    const user = await user_model.findById(token_from_db.user);
    return await userTokens(user);
}

export async function allActiveUsers() {
    const users = await user_model.find();
    return users;
}

export async function changeUserData(id: string, username: string, password: string, password_d: string, password_old:string, class_id: number) {
    const user = await getUserById(id);
    const isEqual = bcrypt.compareSync(password_old, user.password);
    if(!isEqual)
        throw ApiError.badRequest('Wrong password');
    const hash = bcrypt.hashSync(password, 5);
    const user_pdb = await updateUser(id, username, hash, class_id);
    const user_mdb = await user_model.findById(id);
    user_mdb.username = username;
    user_mdb.password = hash;
    await user_mdb.save();
    return await userTokens(user_mdb);
}