import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

const MAX_TITLE_LENGTH = 100;

// PUT - Actualizar tarea
export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id)
    const { title, completed } = await request.json()
    
    // Validar longitud del título si se está actualizando
    if (title !== undefined && title.length > MAX_TITLE_LENGTH) {
      return NextResponse.json({
        success: false,
        message: `El título no puede tener más de ${MAX_TITLE_LENGTH} caracteres`
      }, { status: 400 })
    }
    
    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(completed !== undefined && { completed })
      }
    })
    
    return NextResponse.json({
      success: true,
      data: task
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        message: 'Tarea no encontrada'
      }, { status: 404 })
    }
    
    console.error('Error al actualizar tarea:', error)
    return NextResponse.json({
      success: false,
      message: 'Error al actualizar la tarea',
      error: error.message
    }, { status: 500 })
  }
}

// DELETE - Eliminar tarea
export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id)
    
    await prisma.task.delete({
      where: { id }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Tarea eliminada exitosamente'
    })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json({
        success: false,
        message: 'Tarea no encontrada'
      }, { status: 404 })
    }
    
    console.error('Error al eliminar tarea:', error)
    return NextResponse.json({
      success: false,
      message: 'Error al eliminar la tarea',
      error: error.message
    }, { status: 500 })
  }
}