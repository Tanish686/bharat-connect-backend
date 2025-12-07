import { Router } from 'express'
import { getCourses, enrollCourse } from '../controllers/skill.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/courses', getCourses)
router.post('/enroll', authMiddleware, enrollCourse)

export default router