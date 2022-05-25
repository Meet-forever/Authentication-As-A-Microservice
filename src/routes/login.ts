import { Router, Request, Response, IRouter } from "express";
import { User } from '../model/user';
import { Types } from "mongoose";
import {IUser} from "../model/interface/IUser";
import { generateIdToken, generateAccessToken, generateRefreshToken } from "../utils/generator/JWT";
import { isValidPassword } from "../utils/generator/passwordUtil";
import "dotenv/config"
const router: IRouter = Router();


router.post('/', async(req:Request, res:Response):Promise<void> => {
    const { email, password }: {email?: string, password?: string} = req.body 
    if(email && password){
           const user: (IUser & {_id: Types.ObjectId}) | null = await User.findOne({ email: email})
           if (user){
                if (await isValidPassword(password, user.password)){
                    // Setting AccessToken
                    res.cookie("ajot", generateAccessToken(user), { httpOnly: true})
                    // Setting RefreshToken
                    res.cookie("rjot", generateRefreshToken(user), {httpOnly: true})
                    res.status(200).json({message: "Logged in successfully!", _idtoken: generateIdToken(user)})
                }
                else{
                    res.status(400).json({error: "Invalid credentials!"})
                }
           }
           else{ 
               res.status(400).json({error: 'User not found!'})
           }
    }
    else{ 
        res.status(400).json({error: "Missing credentials!" })
    }
})

export default router;