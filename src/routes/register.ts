import { Router, Request, Response } from "express";
import { User } from "../model/user"
import { generateIdToken, generateAccessToken, generateRefreshToken } from "../utils/generator/JWT"
import { generateHashPassword } from "../utils/generator/passwordUtil"
import "dotenv/config"
const router: Router = Router();

router.post('/', async(req:Request, res:Response):Promise<Response> => {
    const { firstname, lastname, email, password} = req.body
    if (firstname && lastname && email && password) {
        let user = await User.findOne({ email: email})
        if(user){
            return res.status(400).json({message: "User Already Exists"})
        }
        user = new User({
            firstname, lastname, email, password: await generateHashPassword(password)})
        await user.save()
        // generateAccessToken
        res.cookie("ajot", generateAccessToken(user), { httpOnly: true})
        // generateRefreshToken
        res.cookie("rjot", generateRefreshToken(user), { httpOnly: true})
        // generateIdToken
        return res.json({
            message: "User registered successfully!", 
            _idToken: generateIdToken(user)
        })
    }
    else{
        return res.status(400).json({message: "Missing credentials!"})
    }
})

export default router;