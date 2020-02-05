import { Request, Response } from 'express'
import { TokenInterface } from '../../../middlewares/auth'
import { IPost, Post } from '../../../models/post'

export const createPost = (req: Request, res: Response) => {
  const userId = (req.body.decoded as TokenInterface)._id
  const roomId = req.params.roomId
  const { content, image } = req.body

  Post.create(roomId, userId, content, image)
    .then((post: IPost) => {
      res.json({
        _id: post._id
      })
    })
    .catch((err: Error) => {
      res.status(400).json({
        message: err.message
      })
    })
}

export const postInfo = (req: Request, res: Response) => {
  const userId = (req.body.decoded as TokenInterface)._id
  const postId = req.params.postId

  Post.findById(postId)
    .then((post: IPost | null) => {
      if (!post) throw new Error('Post not found')
      res.json(post.toPostResponse(userId))
    })
    .catch((err: Error) => {
      res.status(404).json({
        message: err.message
      })
    })
}

export const vote = (req: Request, res: Response) => {
  const postId = req.params.postId
  const userId = (req.body.decoded as TokenInterface)._id

  Post.findById(postId)
    .then((post: IPost | null) => {
      if (!post) throw new Error('Post not found')
      if (post.isClosed()) throw new Error("This post's vote is closed")
      return post.vote(userId)
    })
    .then((post: IPost) => {
      res.json({
        agreedUsers: post.agreedUsers,
        agreed: post.agreedUsers.includes(userId)
      })
    })
    .catch((err: Error) => {
      res.status(400).json({
        message: err.message
      })
    })
}
