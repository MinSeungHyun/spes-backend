import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { IRoom, Room } from '../../../models/room';
import { verifyToken } from '../../../utils/authorization';
import { TokenInterface } from '../../../utils/tokenInterface';


export const create = (req: Request, res: Response) => {
    const token = req.headers.authorization
    const { title, goal, continuous, finish } = req.body

    const createRoom = (decoded: TokenInterface) => Room.create(decoded._id, title, goal, continuous, finish)

    const respond = (room: IRoom) => {
        res.json({
            _id: room._id
        })
    }

    const onError = (error: Error) => {
        res.status(401).json({
            message: error.message
        })
    }

    verifyToken(token)
        .then(createRoom)
        .then(respond)
        .catch(onError)
}

export const join = (req: Request, res: Response) => {
    const token = req.headers.authorization
    const roomId = req.params.roomId
    let userId: string

    const saveUserIdAndFindRoom = (decoded: TokenInterface) => {
        userId = decoded._id
        return Room.findById(roomId)
    }

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

    verifyToken(token)
        .then(saveUserIdAndFindRoom)
        .then(joinUser)
        .catch(onError)
}