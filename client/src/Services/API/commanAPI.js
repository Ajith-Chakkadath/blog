import axios from 'axios'

export const commonAPI = async(httpReq, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpReq,
        url,
        data: reqBody,
        headers: reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then(
        (result) => {
            return result
        }
    ).catch(
        (error) => {
            return error
        }
    )
}