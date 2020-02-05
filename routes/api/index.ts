import express, { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth'
import { auth } from './auth'
import { image } from './image/index'
import { post } from './post/index'
import { room } from './room/index'
import { user } from './user'

const router: Router = express.Router()
router.use('/auth', auth)
router.use('/user', authMiddleware, user)
router.use('/room', authMiddleware, room)
router.use('/post', authMiddleware, post)
router.use('/image', image)

export const api = router
