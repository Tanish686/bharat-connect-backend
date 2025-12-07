import { Request, Response } from 'express'
import supabase from '../config/supabase.js'

export const getInventory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId

    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    res.json({
      success: true,
      data: { inventory: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId
    const invoiceData = req.body

    const { data, error } = await supabase
      .from('invoices')
      .insert([{ ...invoiceData, user_id: userId }])
      .select()
      .single()

    if (error) throw error

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: { invoice: data }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}