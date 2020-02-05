import express, { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth';
import { auth } from './auth';
import { post } from './post/index';
import { room } from './room/index';
import { user } from './user';

const router: Router = express.Router()
router.use('/auth', auth)

router.use('/user', authMiddleware)
router.use('/user', user)

router.use('/room', authMiddleware)
router.use('/room', room)

router.use('/post', authMiddleware)
router.use('/post', post)

export const api = router
