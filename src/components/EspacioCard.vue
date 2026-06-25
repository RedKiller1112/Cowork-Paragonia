<script setup>
import { ref } from 'vue'
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
  precio: {
    type: Number,
    required: true
  },
  imagen: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['reservar'])

const fecha = ref('')
const hora = ref('')
const errorReserva = ref('')

const precioCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

const reservar = () => {
  errorReserva.value = ''

  if (!fecha.value || !hora.value) {
    errorReserva.value = 'Debes seleccionar fecha y hora para reservar este espacio.'
    return
  }

  emit('reservar', {
    nombre: props.nombre,
    capacidad: props.capacidad,
    ubicacion: props.ubicacion,
    precio: props.precio,
    fecha: fecha.value,
    hora: hora.value
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
      <p class="precio"><strong>Precio empresa:</strong> {{ precioCLP.format(precio) }}</p>

      <label class="campo-label" :for="`fecha-${nombre}`">Fecha de reserva</label>
      <input :id="`fecha-${nombre}`" v-model="fecha" type="date" class="campo-input" />

      <label class="campo-label" :for="`hora-${nombre}`">Hora de reserva</label>
      <input :id="`hora-${nombre}`" v-model="hora" type="time" class="campo-input" />

      <p v-if="errorReserva" class="error-reserva">{{ errorReserva }}</p>

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
.precio {
  color: #0f766e;
  font-weight: 700;
}
.campo-label {
  font-weight: 600;
  color: #334155;
}
.campo-input {
  padding: 9px 10px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
}
.error-reserva {
  margin: 0;
  color: #b91c1c;
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
