import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { TokenInterface } from '../../../middlewares/auth';
import { IRoom, Room } from '../../../models/room';

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
    let userId = decoded._id

    const joinUser = (room: IRoom | null) => {
        if(!room) throw new Error('')
        if(!room.users.includes(userId)) room.users.push(userId)
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