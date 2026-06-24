<script setup>
defineProps({
  texto: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['accion'])

const manejarClick = () => {
  emit('accion')
}
</script>

<template>
  <button class="boton-accion" @click="manejarClick">
    {{ texto }}
  </button>
</template>

<style scoped>
.boton-accion {
  width: fit-content;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #1d4ed8;
  background: linear-gradient(180deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 0.2px;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
}
.boton-accion:hover {
  transform: translateY(-1px);
  filter: brightness(1.03);
  box-shadow: 0 10px 24px rgba(37, 99, 235, 0.34);
}
.boton-accion:active {
  transform: translateY(0);
}
.boton-accion:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.25);
  outline-offset: 2px;
}
</style>
