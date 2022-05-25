import jwt from "jsonwebtoken"
import { IUser } from "../../model/interface/IUser"
import { Types } from "mongoose"
import "dotenv/config"


export const generateIdToken = (user : (IUser & {_id: Types.ObjectId})) =>{
    return jwt.sign({
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image
    }, process.env.SECRET as string, {
        algorithm: 'HS256'
    })
}


export const generateAccessToken = (user : IUser & {_id: Types.ObjectId} | {_id: Types.ObjectId}, secure: boolean = true) => {
        return jwt.sign({
            __id : user._id,
            secure: secure
            }, process.env.ACCESS_TOKEN_SECRET as string, {
                expiresIn: '10m',
                algorithm: 'HS256'
        })
}

export const generateRefreshToken = (user : IUser & {_id: Types.ObjectId} | {_id: Types.ObjectId}, secure: boolean = true) => {
        return jwt.sign({
            __id : user._id,
            secure: secure
            }, process.env.REFRESH_TOKEN_SECRET as string, {
                expiresIn: '7d',
                algorithm: 'HS256'
        })
}


export const getPayload = (token: string, secret: string): {_id: Types.ObjectId, secure: boolean}| undefined => {
    let result = null
    try{
        result = jwt.verify(token, secret)
    }
    catch{
        return undefined
    }
    return Object(result)
}