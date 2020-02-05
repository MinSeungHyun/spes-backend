import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { IUser, User } from '../../../models/user'

export const register = (req: Request, res: Response) => {
    const { username, email, password, profile } = req.body

    const create = (user: IUser) => {
        if (user) {
            throw new Error('Email already exists')
        } else {
            return User.create(username, email, password, profile)
        }
    }

    const respond = () => {
        res.json({
            message: 'success'
        })
    }

    const onError = (error: Error) => {
        res.status(400).json({
            message: error.message
        })
    }

    User.schema.statics.findOneByEmail(email)
        .then(create)
        .then(respond)
        .catch(onError)
}

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body
    const secret = req.app.get('jwt-secret')
    let _id: string, username: string, profile: string

    const check = (user: IUser): Promise<string> => {
        if (!user){
            throw new Error('login failed')
        } else {
            if(user.verify(password)) {
                _id = user._id
                username = user.username
                profile = user.profile

                return new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id,
                            email,
                            username,
                            profile
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                })
            } else {
                throw new Error('login failed')
            }
        }
    }

    const respond = (token: string) => {
        res.json({
            token,
            user: {
                _id,
                email,
                username,
                profile
            }
        })
    }

    const onError = (error: Error) => {
        res.status(400).json({
            message: error.message
        })
    }

    User.schema.statics.findOneByEmail(email)
        .then(check)
        .then(respond)
        .catch(onError)
}
