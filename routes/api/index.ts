import express, { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { auth } from './auth';
import { room } from './room/index';
import { user } from './user';

const router: Router = express.Router()
router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/room', authMiddleware)
router.use('/room', room)

export const api = router
