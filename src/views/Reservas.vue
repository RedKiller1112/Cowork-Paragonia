<script setup>
import espacios from '../data/espacios.json'
import EspacioCard from '../components/EspacioCard.vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const reservarEspacio = (espacio) => {
  userStore.agregarReserva(espacio)
}
</script>

<template>
  <section>
    <h1>Espacios reservables</h1>
    <p>Selecciona un espacio para agregarlo a tus reservas.</p>

    <div class="grid">
      <EspacioCard
        v-for="espacio in espacios"
        :key="espacio.id"
        :nombre="espacio.nombre"
        :capacidad="espacio.capacidad"
        :ubicacion="espacio.ubicacion"
        :imagen="espacio.imagen"
        @reservar="reservarEspacio({ ...espacio, ...$event })"
      />
    </div>

    <div v-if="userStore.reservas.length" class="ayuda">
      <h2>¿Ya reservaste? Estamos para ayudarte</h2>
      <p>Si quieres escribirnos, te respondemos por WhatsApp.</p>
      <div class="acciones">
        <a
          class="btn-whatsapp"
          href="https://wa.me/56936107090"
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 Escríbenos al WhatsApp
        </a>
        <a class="btn-faq" href="#faq">❓ Preguntas frecuentes</a>
      </div>
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
.ayuda {
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #dbe2ea;
  border-radius: 14px;
  background: #f8fbff;
}
.acciones {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.btn-whatsapp,
.btn-faq {
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
}
.btn-whatsapp {
  background: #25d366;
  color: #fff;
}
.btn-faq {
  background: #e2e8f0;
  color: #0f172a;
}
</style>
