<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const nombreGuardado = computed(() => userStore.nombreUsuario?.trim() || '')

const faqs = [
  {
    pregunta: '¿Qué formas de pago aceptan para empresas?',
    respuesta: 'Aceptamos transferencia bancaria, Webpay empresas y pago con orden de compra corporativa.'
  },
  {
    pregunta: '¿Cómo puedo contactar soporte rápido?',
    respuesta: 'Puedes escribirnos al correo contacto@coworkpatagonia.cl y te responderemos a la brevedad.'
  },
  {
    pregunta: '¿Dónde están ubicados?',
    respuesta: 'Nuestra sede principal está en Sotero del Río 326, con acceso cercano a transporte público.'
  },
  {
    pregunta: '¿Puedo reservar por horas o por jornada completa?',
    respuesta: 'Sí. Ofrecemos modalidad por hora, media jornada y jornada completa según disponibilidad.'
  },
  {
    pregunta: '¿Incluyen internet y equipamiento?',
    respuesta: 'Sí, todos los espacios incluyen Wi-Fi de alta velocidad, mobiliario ergonómico y climatización.'
  },
  {
    pregunta: '¿Emiten boleta o factura para empresa?',
    respuesta: 'Emitimos factura electrónica y documentación tributaria válida para Chile.'
  },
  {
    pregunta: '¿Qué pasa si necesito cambiar mi reserva?',
    respuesta: 'Puedes reprogramar con anticipación según políticas vigentes y disponibilidad del espacio.'
  }
]
</script>

<template>
  <section class="inicio">
    <div class="hero">
      <h1>Bienvenido/a</h1>
      <p v-if="nombreGuardado" class="saludo-personalizado">
        Hola, <strong>{{ nombreGuardado }}</strong>. Tu perfil ya está activo.
      </p>
      <p>Esta es la app de reservas de Cowork Patagonia.</p>
      <p>Explora espacios, reserva en segundos y gestiona todo desde tu perfil.</p>
    </div>

    <div id="faq" class="faq-grid">
      <article v-for="item in faqs" :key="item.pregunta" class="faq-card">
        <h3>{{ item.pregunta }}</h3>
        <p>{{ item.respuesta }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.inicio {
  display: grid;
  gap: 24px;
}
.hero {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe 55%, #a5f3fc);
  color: #0f172a;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 14px 34px rgba(59, 130, 246, 0.18);
}
.hero h1 {
  margin: 0 0 8px;
}
.hero p {
  margin: 8px 0 0;
}
.saludo-personalizado {
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(148, 163, 184, 0.35);
}
.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 14px;
}
.faq-card {
  border-radius: 14px;
  padding: 16px;
  border: 1px solid #dbe2ea;
  background: linear-gradient(180deg, #ffffff, #f8fbff);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}
.faq-card h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}
.faq-card p {
  margin: 0;
  color: #334155;
}
</style>
