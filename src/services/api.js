export const API = (() => {
  // datos ejemplo
  const tickets = [
    {
      id: 1,
      titulo: "Error en login",
      descripcion: "Los usuarios no pueden iniciar sesión",
      estado: "Abierto",
      prioridad: "Alta",
      fechaCreacion: "2024-08-10T10:30:00Z",
      fechaActualizacion: "2024-08-10T10:30:00Z",
      asignadoA: "juan.perez@tuboleta.com",
      etiquetas: ["backend", "auth", "crítico"]
    },
    {
      id: 2,
      titulo: "Mejora en UI",
      descripcion: "Actualizar diseño del header",
      estado: "En Progreso",
      prioridad: "Media",
      fechaCreacion: "2024-08-12T14:15:00Z",
      fechaActualizacion: "2024-08-13T09:20:00Z",
      asignadoA: "maria.garcia@tuboleta.com",
      etiquetas: ["frontend", "diseño"]
    }
  ];

  const usuarios = [
    { id: 1, nombre: "Juan Pérez", email: "juan.perez@tuboleta.com", rol: "Backend Developer" },
    { id: 2, nombre: "María García", email: "maria.garcia@tuboleta.com", rol: "Frontend Developer" }
  ];

  // Función para simular delay + errores aleatorios
  const simulateRequest = (data, options = {}) => {
    const { timeout = 5000, failRate = 0.2 } = options;

    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 500; // 0.5 - 1.5s de delay
      setTimeout(() => {
        const rnd = Math.random();

        // 500
        if (rnd < 0.15) return reject({ status: 500, message: "Internal Server Error" });
        // rate Limit
        if (rnd >= 0.15 && rnd < 0.20) return reject({ status: 429, message: "Rate Limit Exceeded" });
        //  timeout
        if (delay > timeout) return reject({ status: 408, message: "Request Timeout" });

        resolve(data);
      }, delay);
    });
  };

  // API methods
  return {
    getTickets: async () => simulateRequest([...tickets]),
    getTicket: async (id) => {
      const ticket = tickets.find(t => t.id === id);
      if (!ticket) return Promise.reject({ status: 404, message: "Ticket no encontrado" });
      return simulateRequest(ticket);
    },
    createTicket: async (ticket) => {
      const newTicket = { ...ticket, id: tickets.length + 1 };
      tickets.push(newTicket);
      return simulateRequest(newTicket);
    },
    updateTicket: async (id, updates) => {
      const index = tickets.findIndex(t => t.id === id);
      if (index === -1) return Promise.reject({ status: 404, message: "Ticket no encontrado" });
      tickets[index] = { ...tickets[index], ...updates, fechaActualizacion: new Date().toISOString() };
      return simulateRequest(tickets[index]);
    },
    deleteTicket: async (id) => {
      const index = tickets.findIndex(t => t.id === id);
      if (index === -1) return Promise.reject({ status: 404, message: "Ticket no encontrado" });
      tickets.splice(index, 1);
      return simulateRequest({ success: true });
    },
    getUsuarios: async () => simulateRequest([...usuarios])
  };
})();
