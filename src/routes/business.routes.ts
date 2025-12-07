import { Router } from 'express'
import { getInventory, createInvoice } from '../controllers/business.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/inventory', authMiddleware, getInventory)
router.post('/invoice', authMiddleware, createInvoice)

export default router