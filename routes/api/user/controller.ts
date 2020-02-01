import { Request, Response } from 'express';
import { User } from '../../../models/user';


/*
GET /api/user/list
*/

export const list = (_: Request, res: Response) => {
    User.find({}, '-password -__v')
        .then(users => res.json({
            message: 'success',
            users 
        }))
}