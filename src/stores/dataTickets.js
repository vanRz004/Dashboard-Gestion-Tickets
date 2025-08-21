import { defineStore } from 'pinia'

export const useTicketStore = defineStore('tickets', {
  state: () => ({
    tickets: []
  }),
  actions: {
    setTickets(tickets) {
      this.tickets = tickets
    },
    addTicket(ticket) {
      this.tickets.push(ticket)
    },
    updateTicket(updatedTicket) {
      const index = this.tickets.findIndex(t => t.id === updatedTicket.id)
      if (index !== -1) this.tickets[index] = updatedTicket
    }
  }
})
