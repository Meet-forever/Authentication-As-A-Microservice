import "dotenv/config"
import { Router, Request, Response, IRouter } from "express";
import { User } from '../model/user';
import { Types } from "mongoose";
import {IUser} from "../model/interface/IUser";
import { generateIdToken, generateAccessToken, generateRefreshToken } from "../utils/generator/JWT";
import { isValidPassword } from "../utils/generator/passwordUtil";
const router: IRouter = Router();


router.post('/', async(req:Request, res:Response):Promise<Response> => {
    const { email, password }: {email?: string, password?: string} = req.body 
    if (!email || !password) return res.status(400).json({error: "Missing credentials!" });
    const user: (IUser & {_id: Types.ObjectId}) | null = await User.findOne({ email: email})
    if (!user) return res.status(400).json({error: 'User not found!'})
    if (!(await isValidPassword(password, user.password))) return res.status(400).json({error: "Invalid credentials!"})
    /* 
       - For the API gateway, the following code won't work!
        - Instead of setting the cookie like below, we have to send 
          the cookies in the form of response to the API gateway. 
    */
    // Setting AccessToken
    res.cookie("ajot", generateAccessToken(user), { httpOnly: true})
    // Setting RefreshToken
    res.cookie("rjot", generateRefreshToken(user), {httpOnly: true})
    return res.status(200).json({message: "Logged in successfully!", _idtoken: generateIdToken(user)})
})

export default router;