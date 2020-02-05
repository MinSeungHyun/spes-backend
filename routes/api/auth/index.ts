import express, { Router } from 'express';
import { login, register } from './controller';

const router: Router = express.Router()
router.post('/register', register)
router.post('/login', login)

export const auth = router
