import { model, Schema } from "mongoose";
import {IUser} from "./interface/IUser"

const strOptions = {
    type: String,
    required: true
}

const UserSchema: Schema = new Schema<IUser>({
    firstname: strOptions,
    lastname: strOptions,
    email: {
            ...strOptions,
            unique: true
        },
    password: strOptions,
    image: {
        type: String,
        default: 'default.png'
    },
    roles : {
        type: [ String ],
        enum: ['user', 'admin', 'super_user'],
        default: ['user']
    }
})

const User = model<IUser>('user', UserSchema)
export { User }