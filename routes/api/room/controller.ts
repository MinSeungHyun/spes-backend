import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenInterface } from '../../../utils/tokenInterface';
import { Room, IRoom } from '../../../models/room';


export const create = (req: Request, res: Response) => {
    const token = req.headers.authorization
    const { title, goal, continuous, finish } = req.body

    const verify = (token: string | undefined): Promise<TokenInterface> => {
        if(!token) throw new Error('Authorization header not found')
        const decoded = jwt.verify(token, req.app.get('jwt-secret')) as TokenInterface
        return new Promise((resolve) => {
            resolve(decoded)
        })
    }

    const create = (decoded: TokenInterface) => Room.create(decoded._id, title, goal, continuous, finish)

    const respond = (room: IRoom) => {
        res.json({
            id: room._id
        })
    }

    const onError = (error: Error) => {
        res.status(401).json({
            message: error.message
        })
    }

    verify(token)
        .then(create)
        .then(respond)
        .catch(onError)
}