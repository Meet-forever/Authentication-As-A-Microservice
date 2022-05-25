import { Router, Request, Response } from "express";
import { getPayload } from "../utils/generator/JWT";
import {generateAccessToken, generateRefreshToken} from "../utils/generator/JWT"
import "dotenv/config"
const router: Router = Router();


router.post('/', (req:Request, res:Response):Response => {
    if(!req.cookies) return res.status(200).json({message: "Logged Out!"})
    const {ajot, rjot} = req.cookies
    if(!ajot || !rjot) return res.status(403).json({ error: "Token Missing!"})
    const apayload = getPayload(ajot, String(process.env.ACCESS_TOKEN_SECRET))  
    const rpayload = getPayload(rjot, String(process.env.REFRESH_TOKEN_SECRET)) 
    if(!apayload || !rpayload)  return res.status(200).json({message: "Invalid Token!"})
    res.cookie("ajot", 
    generateAccessToken(
            {_id: apayload._id,}, false), 
            { httpOnly: true}
    )   
    res.cookie("rjot", 
    generateRefreshToken(
        {_id: rpayload._id,}, false), 
        { httpOnly: true}
    )
    return res.status(200).json({message: "Logged Out!"})
})

export default router;