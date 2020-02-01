import { Router } from "express";
import { list } from './controller';

const router = Router()
router.get('/list', list)

export const user = router