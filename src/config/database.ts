import mongoose from 'mongoose';

const startDatabase = async(uri?: string, options?: mongoose.ConnectOptions):Promise<void> => {  
        if(uri)
        await mongoose.connect(uri, options)
        .then(()=> console.log('Connected to MongoDB'))
        .catch(e => console.error(e))
}

export { startDatabase }