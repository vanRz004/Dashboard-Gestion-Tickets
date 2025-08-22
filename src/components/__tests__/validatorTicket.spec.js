import { describe, it, expect } from 'vitest'
import { validateTicket } from '@/utils/validators'

describe('Validación de ticket', () => {

  it('campos vacíos', () => {
    const ticket = { titulo: '', descripcion: '', prioridad: '', asignadoA: '' }
    const errors = validateTicket(ticket)
    // comprobación por campo
    expect(errors.titulo).toBe('El título es obligatorio')
    expect(errors.descripcion).toBe('La descripción es obligatoria')
  })

  it('si todo es correcto', () => {
    const ticket = {
      titulo: 'Prueba',
      descripcion: 'Descripción prueba',
      prioridad: 'Alta',
      asignadoA: 'usuario@correo.com'
    }
    const errors = validateTicket(ticket)
    expect(Object.keys(errors).length).toBe(0)
  })

})
