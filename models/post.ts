import { Document, model, Schema } from 'mongoose'
import { IRoom, Room } from './room'

export interface IPost extends Document {
  content: string
  author: string
  image: string
  agreedUsers: [string]
  created: number
  userCount: number

  vote(userId: string): Promise<IPost>
  create(roomId: string, userId: string, content: string, image: string | undefined): Promise<IPost>
  toPostResponse(userId: string): PostResponse
  isClosed(): boolean
}

const PostSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  userCount: { type: Number, required: true },
  image: { type: String, default: '' },
  agreedUsers: { type: [String], default: [] },
  created: { type: Number, default: Date.now() }
})

PostSchema.statics.create = function(roomId: string, userId: string, content: string, image: string | undefined): Promise<IPost> {
  const post: IPost = new this({
    author: userId,
    content,
    image
  })
  return Room.findById(roomId)
    .then((room: IRoom | null) => {
      if (!room) throw new Error('Room not found')
      room.posts.push(post._id)
      room.save()

      post.userCount = room.users.length
      return post.save()
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

PostSchema.methods.vote = function(userId: string): Promise<IPost> {
  const post = this as IPost
  post.agreedUsers.push(userId)
  return post.save()
}

PostSchema.methods.toPostResponse = function(userId: string): PostResponse {
  const post = this as IPost
  return {
    _id: post._id,
    content: post.content,
    image: post.image,
    author: post.author,
    agreedUsers: post.agreedUsers,
    agreed: post.agreedUsers.includes(userId),
    created: post.created,
    closed: post.isClosed()
  } as PostResponse
}

PostSchema.methods.isClosed = function(): boolean {
  const post = this as IPost
  return post.agreedUsers.length >= post.userCount
}

export const Post = model<IPost>('Post', PostSchema)

export interface PostResponse {
  _id: string
  content: string
  image: string
  author: string
  agreedUsers: [string]
  agreed: boolean
  created: number
  closed: boolean
}
