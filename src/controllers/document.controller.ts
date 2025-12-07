import { Request, Response } from 'express'
import supabase from '../config/supabase.js'

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId

    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({
      success: true,
      data: { documents: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const documentData = req.body

    const { data, error } = await supabase
      .from('documents')
      .insert([{ ...documentData, user_id: userId }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully',
      data: { document: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}