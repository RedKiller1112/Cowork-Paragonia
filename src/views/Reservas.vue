<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import espacios from '../data/espacios.json'
import EspacioCard from '../components/EspacioCard.vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const router = useRouter()
const mensajeReserva = ref('')

const reservarEspacio = (espacio) => {
  mensajeReserva.value = ''

  const conflicto = userStore.reservas.some(
    (r) => r.id === espacio.id && r.fecha === espacio.fecha && r.hora === espacio.hora
  )

  if (conflicto) {
    mensajeReserva.value =
      `No disponible: ${espacio.nombre} ya está reservado para ${espacio.fecha} a las ${espacio.hora}.`
    return
  }

  userStore.agregarReserva(espacio)
  router.push('/perfil')
}
</script>

<template>
  <section>
    <h1>Espacios reservables</h1>
    <p>Selecciona un espacio para agregarlo a tus reservas.</p>
    <p v-if="mensajeReserva" class="mensaje-error">{{ mensajeReserva }}</p>

    <div class="grid">
      <EspacioCard
        v-for="espacio in espacios"
        :key="espacio.id"
        :nombre="espacio.nombre"
        :capacidad="espacio.capacidad"
        :ubicacion="espacio.ubicacion"
        :precio="espacio.precio"
        :imagen="espacio.imagen"
        @reservar="reservarEspacio({ ...espacio, ...$event })"
      />
    </div>
  </section>
</template>

<style scoped>
.grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.mensaje-error {
  margin-top: 12px;
  margin-bottom: 4px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
  font-weight: 600;
}
</style>
