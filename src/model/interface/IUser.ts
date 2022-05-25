export interface IUser extends Document {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    image: string,
    roles: [string]
}