import { Document, model, Schema } from 'mongoose';

export interface IRoom extends Document {
    title: string
    goal: string
    continuous: boolean
    finish: number
    users: [string]
    posts: [string]

    create(userId: string, title: string, goal: string, continuous: boolean, finish: number): Promise<IRoom>
}

const RoomSchema = new Schema({
    title: { type: String,  required: true},
    goal: { type: String,  required: true},
    continuous: { type: Boolean,  required: true},
    finish: { type: Date,  required: true},
    users: { type: [String], default: []},
    posts: { type: [String], default: []}
})

RoomSchema.statics.create = function(userId: string, title: string, goal: string, continuous: boolean, finish: number): Promise<IRoom> {
    const room: IRoom = new this({ title, goal, continuous, finish })
    room.users.push(userId)
    return room.save()
}

export const Room = model<IRoom>('Room', RoomSchema)