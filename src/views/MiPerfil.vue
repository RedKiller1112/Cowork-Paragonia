<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import BotonAccion from '../components/BotonAccion.vue'

const userStore = useUserStore()
const nombreTemporal = ref(userStore.nombreUsuario)

const guardarNombre = () => {
  if (nombreTemporal.value.trim()) {
    userStore.actualizarNombre(nombreTemporal.value.trim())
  }
}
</script>

<template>
  <section>
    <h1>Mi Perfil</h1>

    <div class="perfil">
      <label for="nombre">Nombre del usuario</label>
      <input id="nombre" v-model="nombreTemporal" type="text" />
      <BotonAccion texto="Guardar nombre" @accion="guardarNombre" />
    </div>

    <div class="reservas">
      <h2>Mis reservas</h2>
      <ul v-if="userStore.reservas.length > 0">
        <li v-for="reserva in userStore.reservas" :key="reserva.id">
          {{ reserva.nombre }} ({{ reserva.capacidad }} personas) - {{ reserva.ubicacion }}
        </li>
      </ul>
      <p v-else>Aún no tienes reservas registradas.</p>
    </div>
  </section>
</template>

<style scoped>
.perfil {
  display: grid;
  gap: 10px;
  max-width: 360px;
}
input {
  padding: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}
.reservas {
  margin-top: 24px;
}
</style>
