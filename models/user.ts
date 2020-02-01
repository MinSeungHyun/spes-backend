import mongoose, { Document, Schema, Model, model } from 'mongoose'
import scrypt from 'scryptsy'

const hashPassword = (password: string) =>
    scrypt(password, '$alt', 8192, 5, 1, 25).toString('base64')

mongoose.set('useCreateIndex', true)

export interface IUser extends Document {
    username: string
    email: string
    password: string
}

export interface IUserModel extends Model<IUser> {
    findOneByEmail(email: string): Promise<IUserModel>
    verify(password: string): boolean
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, trim: true, unique: true, lowercase: true },
    password: { type: String, required: true }
})

UserSchema.statics.create = function(username: string, email: string, password: string) {
    const user = new this({
        username,
        email,
        password: hashPassword(password)
    })
    user.save()
}

UserSchema.statics.findOneByEmail = function(email: string) {
    return this.findOne({ email }).exec()
}

UserSchema.methods.verify = function(password: string) {
    return this.password === hashPassword(password)
}

export const User = model<IUser, IUserModel>('User', UserSchema)
