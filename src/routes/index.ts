import express from 'express'
import CourseController from '../controllers/course.controller'

const router = express.Router()
router.get('/courses/:id', CourseController.coursesById)
router.post('/courses', CourseController.createCourse)
router.put('/courses/:id', CourseController.updateCourse)

export default router
