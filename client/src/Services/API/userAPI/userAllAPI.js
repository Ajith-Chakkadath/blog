import { base_url } from "../baseURL";
import { commonAPI } from "../commanAPI";

export const login =async(reqBody)=>{
    return await commonAPI("POST", `${base_url}/users/login`, reqBody, "")
}

export const register = async(reqBody)=>{
    return await commonAPI("POST", `${base_url}/users/register`, reqBody, "")
}