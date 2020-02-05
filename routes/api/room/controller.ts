import { Request, Response } from 'express'
import { Error } from 'mongoose'
import { TokenInterface } from '../../../middlewares/auth'
import { IRoom, Room, RoomResponse } from '../../../models/room'

export const create = (req: Request, res: Response) => {
  const decoded = req.body.decoded as TokenInterface
  const { title, goal, continuous, finish } = req.body

  Room.create(decoded._id, title, goal, continuous, finish)
    .then((room: IRoom) => {
      res.json({
        _id: room._id
      })
    })
    .catch((error: Error) => {
      res.status(401).json({
        message: error.message
      })
    })
}

export const join = (req: Request, res: Response) => {
  const decoded = req.body.decoded as TokenInterface
  const roomId = req.params.roomId
  const userId = decoded._id

  const joinUser = (room: IRoom | null) => {
    if (!room) throw new Error('')
    if (!room.users.includes(userId)) room.users.push(userId)
    room.save()
    res.json({
      message: 'success'
    })
  }

  const onError = () => {
    res.status(404).json({
      message: 'Room not found'
    })
  }

  Room.findById(roomId)
    .then(joinUser)
    .catch(onError)
}

export const roomInfo = (req: Request, res: Response) => {
  const userId = (req.body.decoded as TokenInterface)._id
  const roomId = req.params.roomId

  Room.findById(roomId)
    .then((room: IRoom | null) => {
      if (!room) throw new Error('Room not found')
      return room.toRoomResponse(userId)
    })
    .then((roomResponse: RoomResponse) => {
      res.json(roomResponse)
    })
    .catch((err: Error) => {
      res.status(400).json({
        message: err.message
      })
    })
}

export const roomsForUser = (req: Request, res: Response) => {
  const userId = (req.body.decoded as TokenInterface)._id
  Room.find({ users: userId })
    .then(async (rooms: IRoom[]) => {
      const roomResponses: RoomResponse[] = []
      for (const room of rooms) {
        const roomResponse = await room.toRoomResponse(userId)
        roomResponses.push(roomResponse)
      }
      res.json({
        rooms: roomResponses
      })
    })
    .catch((err: Error) => {
      res.status(400).json({
        message: err.message
      })
    })
}
