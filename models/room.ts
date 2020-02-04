import { Document, Model, Schema, model } from 'mongoose';

export interface IRoom extends Document {
    title: string
    goal: string
    continuous: boolean
    finish: number
    users: [number]
    posts: [number]
}

export interface IRoomModel extends Model<IRoom> {
}

const RoomSchema = new Schema({
    title: { type: String,  required: true},
    goal: { type: String,  required: true},
    continuous: { type: Boolean,  required: true},
    finish: { type: Date,  required: true},
    users: { type: Array, default: []},
    posts: { type: Array, default: []}
})

export const Room = model<IRoom, IRoomModel>('Room', RoomSchema)