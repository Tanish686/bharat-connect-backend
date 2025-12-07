import { Router } from 'express'
import { getDocuments, uploadDocument } from '../controllers/document.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', authMiddleware, getDocuments)
router.post('/upload', authMiddleware, uploadDocument)

export default router