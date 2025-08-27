import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Probar la conexión con una consulta simple
    await prisma.$connect()
    
    // Contar las tareas (debería ser 0 inicialmente)
    const taskCount = await prisma.task.count()
    
    return NextResponse.json({
      success: true,
      message: 'Conexión a la base de datos exitosa',
      data: {
        taskCount,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error de conexión:', error)
    return NextResponse.json({
      success: false,
      message: 'Error al conectar con la base de datos',
      error: error.message
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}