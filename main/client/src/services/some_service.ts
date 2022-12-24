import api from "../http";
import {AxiosResponse} from 'axios';

export async function get_some(): Promise<AxiosResponse<JSON>> {
    return api.get<JSON>('/some')
}