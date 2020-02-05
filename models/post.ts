import { Document, model, Schema } from 'mongoose'
import { Room } from './room'
import { User } from './user'

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

PostSchema.statics.create = async function(roomId: string, userId: string, content: string, image: string | undefined): Promise<IPost> {
  const post: IPost = new this({
    author: userId,
    content,
    image
  })

  const room = await Room.findById(roomId)
  if (!room) throw new Error('Room not found')
  room.posts.push(post._id)
  await room.save()

  const user = await User.findById(userId)
  if (!user) throw new Error('User not found')
  user.achievement[1]++
  user.markModified('achievement')
  await user.save()

  post.userCount = room.users.length
  return post.save()
}

PostSchema.methods.vote = async function(userId: string): Promise<IPost> {
  const post = this as IPost
  const index = post.agreedUsers.indexOf(userId)
  if (index == -1) post.agreedUsers.push(userId)
  else post.agreedUsers.splice(index, 1)

  if (post.isClosed()) {
    const user = await User.findById(post.author)
    if (!user) throw new Error('User not found')
    user.achievement[0]++
    user.markModified('achievement')
    await user.save()
  }

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
