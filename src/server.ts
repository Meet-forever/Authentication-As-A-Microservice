import { app } from './app';
import { startDatabase } from './config/database';
import dotenv from "dotenv"
dotenv.config()

app.listen(process.env.PORT, async():Promise<void> => {
    await startDatabase(process.env.DB_URI, undefined)
    console.log(`Listening on PORT ${process.env.PORT}`)
});