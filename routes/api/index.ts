import express, { Router } from 'express'
import { auth } from './auth'
import { user } from './user'

const router: Router = express.Router()
router.use('/auth', auth)
router.use('/user', user)

export const api = router
