<script setup>
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <section>
    <h1>Bienvenido/a, {{ userStore.nombreUsuario }}</h1>
    <p>Esta es la app de reservas de Cowork Patagonia.</p>
    <p>Usa la barra superior para navegar por Inicio, Reservas y Mi Perfil.</p>

    <div id="faq" class="faq">
      <h2>Preguntas frecuentes</h2>
      <details>
        <summary>¿Cómo hago una reserva?</summary>
        <p>Entra a la sección Reservas y presiona "Reservar espacio" en la tarjeta que quieras.</p>
      </details>
      <details>
        <summary>¿Puedo editar mi nombre de usuario?</summary>
        <p>Sí. En Mi Perfil puedes cambiar el nombre y guardarlo para verlo reflejado en Inicio.</p>
      </details>
      <details>
        <summary>¿Cómo contacto al equipo?</summary>
        <p>Puedes escribirnos directamente por WhatsApp al +56 9 3610 7090.</p>
      </details>
    </div>
  </section>
</template>
