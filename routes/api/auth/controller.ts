import { Response, Request } from "express"
import { IUser, User, IUserModel } from '../../../models/user';
import { Model } from "mongoose";

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

    const create = (user: IUser) => {
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
