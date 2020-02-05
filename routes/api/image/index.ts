import { Request, Response, Router } from 'express'
import multer = require('multer')

const router = Router()
const parser = multer({ dest: 'api/image' })

router.post('/', parser.single('image'), (req: Request, res: Response) => {
  const file = req.file
  if (!file) return res.status(400).json({ message: 'Request body has no file' })
  console.log(req.file)
  res.json({
    fileName: req.file.filename
  })
})

export const image = router
