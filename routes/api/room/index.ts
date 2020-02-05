import express from 'express'
import { create, join, roomInfo, roomsForUser } from './controller'

const router = express.Router()
router.get('/', roomsForUser)
router.post('/', create)
router.get('/:roomId', roomInfo)
router.post('/:roomId', join)

export const room = router
