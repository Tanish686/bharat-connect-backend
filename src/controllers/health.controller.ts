import { Request, Response } from 'express'
import supabase from '../config/supabase.js'

export const getHealthRecords = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId

    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({
      success: true,
      data: { records: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const createHealthRecord = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const recordData = req.body

    const { data, error } = await supabase
      .from('health_records')
      .insert([{ ...recordData, user_id: userId }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Health record created successfully',
      data: { record: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}