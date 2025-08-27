import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

// GET - Obtener todas las tareas
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({
      success: true,
      data: tasks
    })
  } catch (error) {
    console.error('Error al obtener tareas:', error)
    return NextResponse.json({
      success: false,
      message: 'Error al obtener las tareas',
      error: error.message
    }, { status: 500 })
  }
}

// POST - Crear nueva tarea
export async function POST(request) {
  try {
    const { title } = await request.json()
    
    if (!title || title.trim() === '') {
      return NextResponse.json({
        success: false,
        message: 'El título es requerido'
      }, { status: 400 })
    }
    
    const task = await prisma.task.create({
      data: {
        title: title.trim()
      }
    })
    
    return NextResponse.json({
      success: true,
      data: task
    }, { status: 201 })
  } catch (error) {
    console.error('Error al crear tarea:', error)
    return NextResponse.json({
      success: false,
      message: 'Error al crear la tarea',
      error: error.message
    }, { status: 500 })
  }
}