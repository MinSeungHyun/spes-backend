import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(403).json({
            message: 'Authorization token not found'
        })
    }

    const verifyToken = new Promise((resolve, reject) => {
        jwt.verify(token, config.secret, (error, decoded) => {
            if (error) reject(error)
            resolve(decoded)
        })
    })

    verifyToken.then((decoded) => {
        req.body.decoded = decoded
        next()
    }).catch((error: Error) => {
        res.status(403).json({
            message: error.message
        })
    })
}

export interface TokenInterface  {
    _id: string
    username: string
    email: string
    profile: string
}