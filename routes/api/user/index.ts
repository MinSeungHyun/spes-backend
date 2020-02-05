import { Router } from "express";
import { find, list } from './controller';

const router = Router()
router.get('/', list)
router.get('/:id', find)

export const user = router
