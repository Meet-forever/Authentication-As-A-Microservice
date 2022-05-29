import mongoose from 'mongoose';

const startDatabase = async(uri: string):Promise<void> => { 
        await mongoose.connect(uri)
        .then(()=> console.log('Connected to MongoDB'))
        .catch(e => console.error(e))
}

export { startDatabase }