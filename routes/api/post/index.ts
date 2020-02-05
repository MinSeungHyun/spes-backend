import express from 'express';
import { createPost, postInfo, vote } from './controller';

const router = express.Router()
router.post('/:roomId', createPost)
router.get('/:postId', postInfo)
router.post('/vote/:postId', vote)

export const post = router