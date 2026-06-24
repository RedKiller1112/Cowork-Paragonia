import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    nombreUsuario: 'María Torres',
    reservas: []
  }),
  actions: {
    actualizarNombre(nuevoNombre) {
      this.nombreUsuario = nuevoNombre
    },
    agregarReserva(espacio) {
      const yaExiste = this.reservas.some((r) => r.id === espacio.id)
      if (!yaExiste) {
        this.reservas.push(espacio)
      }
    }
  }
})
