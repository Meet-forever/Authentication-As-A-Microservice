import "dotenv/config"
import { Router, Request, Response } from "express";
import { User } from "../model/user"
import { generateIdToken, generateAccessToken, generateRefreshToken } from "../utils/generator/JWT"
import { generateHashPassword } from "../utils/generator/passwordUtil"
const router: Router = Router();

router.post('/', async(req:Request, res:Response):Promise<Response> => {
    const { firstname, lastname, email, password} = req.body
    if (!firstname || !lastname || !email || !password) return res.status(400).json({message: "Missing credentials!"})
    let user = await User.findOne({ email: email})
    if(user) return res.status(400).json({message: "User Already Exists"})
    user = new User({firstname, lastname, email, password: await generateHashPassword(password)})
    await user.save()
    /* 
       - For the API gateway, the following code won't work!
        - Instead of setting the cookie like below, we have to send 
          the cookies in the form of response to the API gateway. 
    */
    // generateAccessToken
    res.cookie("ajot", generateAccessToken(user), { httpOnly: true})
    // generateRefreshToken
    res.cookie("rjot", generateRefreshToken(user), { httpOnly: true})
    // generateIdToken
    return res.json({
        message: "User registered successfully!", 
        _idToken: generateIdToken(user)
    })
})

export default router;