<script setup>
import BotonAccion from './BotonAccion.vue'

const props = defineProps({
  nombre: {
    type: String,
    required: true
  },
  capacidad: {
    type: Number,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  imagen: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['reservar'])

const reservar = () => {
  emit('reservar', {
    nombre: props.nombre,
    capacidad: props.capacidad,
    ubicacion: props.ubicacion
  })
}
</script>

<template>
  <article class="card">
    <img class="card-imagen" :src="imagen" :alt="`Imagen de ${nombre}`" />
    <div class="card-body">
      <h3>{{ nombre }}</h3>
      <p><strong>Capacidad:</strong> {{ capacidad }} personas</p>
      <p><strong>Ubicación:</strong> {{ ubicacion }}</p>
      <BotonAccion texto="Reservar espacio" @accion="reservar" />
    </div>
  </article>
</template>

<style scoped>
.card {
  border: 1px solid #dbe2ea;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  display: grid;
  gap: 0;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}
.card-imagen {
  width: 100%;
  height: 170px;
  object-fit: cover;
}
.card-body {
  padding: 16px;
  display: grid;
  gap: 10px;
}
h3 {
  margin: 0;
  font-size: 1.1rem;
}
</style>
