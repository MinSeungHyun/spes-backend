import express from 'express'
import { create, join, roomInfo, roomsForUser } from './controller'
import { authMiddleware } from '../../../middlewares/auth'
import { auth } from '../auth/index'

const router = express.Router()
router.get('/', authMiddleware, roomsForUser)
router.post('/', authMiddleware, create)
router.get('/:roomId', authMiddleware, roomInfo)
router.post('/:roomId', join)

export const room = router
