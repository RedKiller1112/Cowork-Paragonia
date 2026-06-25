import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    nombreUsuario: '',
    perfil: {
      nombre: '',
      apellido: '',
      correo: '',
      telefono: ''
    },
    reservas: []
  }),
  actions: {
    actualizarNombre(nuevoNombre) {
      this.nombreUsuario = nuevoNombre
      this.perfil.nombre = nuevoNombre
    },
    guardarPerfil(datosPerfil) {
      this.perfil = {
        ...this.perfil,
        ...datosPerfil
      }
      this.nombreUsuario = this.perfil.nombre?.trim() || ''
    },
    agregarReserva(espacio) {
      const yaExiste = this.reservas.some(
        (r) => r.id === espacio.id && r.fecha === espacio.fecha && r.hora === espacio.hora
      )
      if (!yaExiste) {
        this.reservas.push(espacio)
      }
    },
    limpiarPerfilYReservas() {
      this.nombreUsuario = ''
      this.perfil = {
        nombre: '',
        apellido: '',
        correo: '',
        telefono: ''
      }
      this.reservas = []
    }
  }
})
