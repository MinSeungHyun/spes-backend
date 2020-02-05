import express from 'express'
import { create, join, roomInfo, roomsForUser } from './controller'
import { authMiddleware } from '../../../middlewares/auth'
import { auth } from '../auth/index'

const router = express.Router()
router.get('/', authMiddleware, roomsForUser)
router.post('/', authMiddleware, create)
router.get('/:roomId', roomInfo)
router.post('/:roomId', authMiddleware, join)

export const room = router
