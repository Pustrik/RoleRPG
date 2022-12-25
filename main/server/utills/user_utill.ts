import {userDto} from "../dtos/user_dto";
import {ITokenPair} from "../../interfaces/i_token";
import {generateToken, saveToken} from "../services/token_service";

export async function userTokens(user) {
    const user_dto = userDto(user);
    const tokens: ITokenPair = generateToken({...user_dto});
    await saveToken(user_dto.id, tokens.refresh_token);
    return {user: user_dto, ...tokens};
}