<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <main class="contenedor">
    <RouterView />
  </main>

  <footer class="footer">
    <div class="footer-inner">
      <p>© 2025 Cowork Patagonia. Todos los derechos reservados.</p>
      <p><strong>Contacto:</strong> +56 9 3610 7090</p>
      <p><strong>Dirección:</strong> Sotero del Río 326, Santiago Centro</p>
    </div>
  </footer>
</template>

<style scoped>
.contenedor {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}
.footer {
  margin-top: 20px;
  border-top: 1px solid #dbe2ea;
  background: #0f172a;
  color: #e2e8f0;
}
.footer-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 18px 20px;
  display: grid;
  gap: 6px;
}
.footer p {
  margin: 0;
  color: #e2e8f0;
}
</style>
