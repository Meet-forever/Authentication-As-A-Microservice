import bcrypt from "bcrypt";
import "dotenv/config"
export const isValidPassword = async(password:string, hpass:string) =>{
    const result = await bcrypt.compare(password, hpass)
    return result
} 

export const generateHashPassword  = async(password:string) =>{
    const salt = await bcrypt.genSalt(Number(process.env.SALTROUNDS));
    return await bcrypt.hash(password, salt);
}