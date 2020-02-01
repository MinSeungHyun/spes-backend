import express, { Router } from 'express';
import { register } from './controller';

const router: Router = express.Router()
router.post('/register', register)

export const auth = router