import { Request, Response } from 'express'
import supabase from '../config/supabase.js'

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error

    res.json({
      success: true,
      data: { profile: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const updates = req.body

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { profile: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}