// Función para verificar que los campos donde se escribe no esten vacíos
export const validateTicket = (ticket) => {

  const errors = {}

  if (!ticket.titulo || ticket.titulo.trim() === '') {
    errors.titulo = 'El título es obligatorio'
  }
  if (!ticket.descripcion || ticket.descripcion.trim() === '') {
    errors.descripcion = 'La descripción es obligatoria'
  }
  return errors
}
