import { Document, Model, Schema, model } from 'mongoose';

export interface IPost extends Document {
    content: string
    author: string
    image: string
    agree: number
    agreed: boolean
}

export interface IPostModel extends Model<IPost> {
}

const PostSchema = new Schema({
    content: { type: String, required: true },
    author: { type: String, required: true},
    image: { type: String, default: ""},
    agree: { type: Number, default: 0},
    agreed: { type: Boolean, default: false }
})

export const Post = model<IPost, IPostModel>('Post', PostSchema)