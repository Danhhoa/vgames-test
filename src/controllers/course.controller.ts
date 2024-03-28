import mongoose from 'mongoose'
import Course from '../models/course.model'
import {Request, Response} from 'express'

class CourseController {
  async courses(req: Request, res: Response) {
    const data = await Course.find()
    return res.send({success: true, data})
  }

  async coursesById(req: Request, res: Response) {
    const data = await Course.findById(req.params.id)
    return res.send({success: true, data})
  }

  async createCourse(req: Request, res: Response) {
    const course = new Course({
      title: req.body.title,
      description: req.body.description,
    })

    const newCourse = await course.save()

    return res.send({
      success: true,
      data: newCourse,
    })
  }

  async updateCourse(req: Request, res: Response) {
    const newData = req.body
    const newCourse = await Course.findByIdAndUpdate(req.params.id, newData)

    return res.send({
      success: true,
      data: newCourse,
    })
  }
}

export default new CourseController()
