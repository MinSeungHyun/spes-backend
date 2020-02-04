import jwt from 'jsonwebtoken';
import { TokenInterface } from './tokenInterface';
import { config } from '../config';

export const verifyToken = (token: string | undefined): Promise<TokenInterface> => {
    if(!token) throw new Error('Authorization header not found')
    const decoded = jwt.verify(token, config.secret) as TokenInterface
    return new Promise((resolve) => {
        resolve(decoded)
    })
}