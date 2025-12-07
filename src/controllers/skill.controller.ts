import { Request, Response } from 'express'
import supabase from '../config/supabase.js'

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({
      success: true,
      data: { courses: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const enrollCourse = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const { courseId } = req.body

    const { data, error } = await supabase
      .from('enrollments')
      .insert([{ user_id: userId, course_id: courseId }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: { enrollment: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}