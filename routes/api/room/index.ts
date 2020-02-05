import express from 'express';
import { create, join, roomInfo } from './controller';


const router = express.Router()
router.post('/', create)
router.get('/:roomId', roomInfo)
router.post('/:roomId', join)

export const room = router