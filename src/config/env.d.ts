import {Secret} from "jsonwebtoken"
declare global{
    namespace NodeJS{
        interface ProcessEnv{
            PORT: number,
            DB_URI: string,
            SECRET: string,
            ACCESS_TOKEN_SECRET: string, 
            REFRESH_TOKEN_SECRET: string,
            SALTROUNDS: string
        }
    }
}

export {}