import { Router } from 'express'
import { getHealthRecords, createHealthRecord } from '../controllers/health.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/records', authMiddleware, getHealthRecords)
router.post('/records', authMiddleware, createHealthRecord)

export default router