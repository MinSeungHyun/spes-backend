import express from 'express';
import { create, join } from './controller';


const router = express.Router()
router.post('/', create)
router.post('/:roomId', join)

export const room = router