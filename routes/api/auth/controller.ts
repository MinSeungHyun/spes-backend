import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { IUserModel, User } from '../../../models/user';
import e = require("express");

/*
POST /api/auth/register
{
    username: string,
    email: string,
    password: string
}
*/

export const register = (req: Request, res: Response) => {
    const { username, email, password } = req.body

    const create = (user: IUserModel) => {
        if (user) {
            throw new Error('Email already exists')
        } else {
            return User.create(username, email, password)
        }
    }

    const respond = () => {
        User.create(username, email, password)

        res.json({
            message: 'success'
        })
    }

    const onError = (error: Error) => {
        res.status(400).json({
            message: error.message
        })
    }

    User.findOneByEmail(email)
        .then(create)
        .then(respond)
        .catch(onError)
}

/*
POST /api/auth/login
{
    email: string,
    password: string
}
*/

export const login = (req: Request, res: Response) => {
    const { username, email, password } = req.body
    const secret = req.app.get('jwt-secret')

    const check = (user: IUserModel): Promise<string> => {
        if (!user){
            throw new Error('login failed')
        } else {
            if(user.verify(password)) {
                return new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            email: email,
                            username: username
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
            message: 'success',
            token
        })
    }

    const onError = (error: Error) => {
        res.status(400).json({
            message: error.message
        })
    }

    User.findOneByEmail(email)
        .then(check)
        .then(respond)
        .catch(onError)
}