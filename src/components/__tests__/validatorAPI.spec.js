import { describe, it, expect } from 'vitest'
import { API } from '@/services/api'

describe('API de Tickets', () => {

  // comprobamos que siempre tenga una fecha de creacion
  it('deberia crear un ticket con fecha de creación', async () => {
    const newTicket = {
      titulo: 'prueba',
      descripcion: 'ticket de prueba',
      estado: 'Abierto',
      prioridad: 'Media',
      asignadoA: 'tester@correo.com'
    }

    const created = await API.createTicket(newTicket)
    expect(created.id).toBeDefined()
    expect(created.fechaCreacion).toBeDefined()
    expect(created.titulo).toBe('prueba')
    expect(created.estado).toBe('Abierto')
  })

  it('debería actualizar la fecha de actualización al editar', async () => {
    const ticket = await API.createTicket({
      titulo: 'prueba edición',
      descripcion: 'Edición para fecha de actualización',
      estado: 'Abierto',
      prioridad: 'Alta',
      asignadoA: 'tester@correo.com'
    })

    const updated = await API.updateTicket(ticket.id)
    expect(new Date(updated.fechaActualizacion).getTime()).toBeGreaterThan(new Date(ticket.fechaCreacion).getTime())
  })

})
