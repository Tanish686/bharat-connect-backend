import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import supabase from '../config/supabase.js'

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, phone } = req.body

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: hashedPassword,
          full_name: fullName,
          phone
        }
      ])
      .select()
      .single()

    if (error) throw error

    // Generate JWT
    const token = jwt.sign(
      { userId: data.id, email: data.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: data.id,
          email: data.email,
          fullName: data.full_name
        },
        token
      }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    // Find user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name
        },
        token
      }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Login failed'
    })
  }
}

export const logout = async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logout successful'
  })
}

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId

    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, full_name, phone, avatar_url, created_at')
      .eq('id', userId)
      .single()

    if (error) throw error

    res.json({
      success: true,
      data: { user }
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}