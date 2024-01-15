import { base_url } from "../baseURL";
import { commonAPI } from "../commanAPI";

export const addPost = async(reqBody)=>{
     return await commonAPI("POST", `${base_url}/post/add`, reqBody, "")
}

export const allPost = async()=>{
     return await commonAPI("GET",`${base_url}/posts`,'','')
}