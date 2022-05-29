import { app } from './app';
import { startDatabase } from './config/database';
import dotenv from "dotenv"
dotenv.config()
const { 
    PORT = 8000,
    DB_URI = `mongodb://localhost:27017/testDB`
} = process.env

app.listen(PORT!, async():Promise<void> => {
    await startDatabase(DB_URI);
    console.log(`Listening on PORT ${PORT}`)
});