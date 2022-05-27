import { Request, Response, NextFunction } from "express"
import { getPayload } from  "../generator/JWT";
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) =>{
    const {ajot, rjot} = req.cookies
    if(!ajot || !rjot) return next()
    const pajot = getPayload(ajot, process.env.ACCESS_TOKEN_SECRET as string)
    const prjot = getPayload(rjot, process.env.REFRESH_TOKEN_SECRET as string)
    if(!pajot || !prjot || pajot.secure === false || prjot.secure === false) return next()
    /*
        If user is already authenticated then we can redirect them to home page of the user.
        res.redirect('/home')
    */
    return res.json({message: "User is already authenticated"})
}