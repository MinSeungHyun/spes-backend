import { Request, Response } from 'express'
import { IUser, User, UserResponse, getAchievementProtage } from '../../../models/user'

export const list = (_: Request, res: Response) => {
  User.find()
    .then((users: IUser[]) => {
      users.sort((a, b) => getAchievementProtage(b) - getAchievementProtage(a))

      const userResponses: UserResponse[] = []
      users.forEach((user: IUser) => userResponses.push(user.toUserResponse()))
      res.json({
        users: userResponses
      })
    })
    .catch((error: Error) => {
      res.status(404).json({
        message: error.message
      })
    })
}

export const find = (req: Request, res: Response) => {
  User.findById(req.params.id, '-password -__v')
    .then((user: IUser | null) => {
      if (!user) throw new Error('User not found')
      res.json(user.toUserResponse())
    })
    .catch((error: Error) => {
      res.status(404).json({
        message: error.message
      })
    })
}
