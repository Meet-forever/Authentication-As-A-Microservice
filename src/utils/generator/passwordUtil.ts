import bcrypt from "bcrypt";
import "dotenv/config"
export const isValidPassword = async(password:string, hpass:string) =>{
    const result = await bcrypt.compare(password, hpass)
    return result
} 

export const generateHashPassword  = async(password:string) =>{
    return await bcrypt.hash(password, process.env.SALTROUNDS as string)
}