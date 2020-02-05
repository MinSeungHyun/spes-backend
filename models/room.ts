import { Document, model, Schema } from 'mongoose';
import { Post, PostResponse } from './post';
import { User, UserResponse } from './user';

export interface IRoom extends Document {
    title: string
    goal: string
    continuous: boolean
    finish: number
    users: string[]
    posts: string[]

    create(userId: string, title: string, goal: string, continuous: boolean, finish: number): Promise<IRoom>
    toRoomResponse(userId: string): Promise<RoomResponse>
}

const RoomSchema = new Schema({
    title: { type: String,  required: true},
    goal: { type: String,  required: true},
    continuous: { type: Boolean,  required: true},
    finish: { type: Number,  required: true},
    users: { type: [String], default: []},
    posts: { type: [String], default: []}
})

RoomSchema.statics.create = function(userId: string, title: string, goal: string, continuous: boolean, finish: number): Promise<IRoom> {
    const room: IRoom = new this({ title, goal, continuous, finish })
    room.users.push(userId)
    return room.save()
}

RoomSchema.methods.toRoomResponse = async function(requestUserId: string): Promise<RoomResponse> {
    const room = this as IRoom

    const userResponses: UserResponse[] = []
    for(const userId of room.users){
        const user = await User.findById(userId)
        if(user) userResponses.push(user.toUserResponse())
    }

    const postResponses: PostResponse[] = []
    for(const postId of room.posts){
        const post = await Post.findById(postId)
        if(post) postResponses.push(post.toPostResponse(requestUserId))
    }

    return {
        _id: room._id,
        title: room.title,
        goal: room.goal,
        continuous: room.continuous,
        finish: room.finish,
        users: userResponses,
        posts: postResponses,
        finished: Date.now() >= room.finish
    } as RoomResponse
}

export const Room = model<IRoom>('Room', RoomSchema)

export interface RoomResponse {
    _id: string
    title: string
    goal: string
    continuous: boolean
    finish: number
    users: UserResponse[]
    posts: PostResponse[]
    finished: boolean
}
