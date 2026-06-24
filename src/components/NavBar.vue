<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="brand">
        <span class="brand-dot"></span>
        Cowork Patagonia
      </div>
      <nav class="nav-contenido">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/reservas">Reservas</RouterLink>
        <RouterLink to="/perfil">Mi Perfil</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 30;
  padding: 14px 20px;
}
.navbar-inner {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(15, 23, 42, 0.86);
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.28);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}
.brand {
  color: #e2e8f0;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #38bdf8;
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
}
.nav-contenido {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
a {
  color: #e2e8f0;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 10px;
  transition: all 0.2s ease;
}
a:hover {
  background: rgba(59, 130, 246, 0.2);
}
.router-link-exact-active {
  background: #2563eb;
  color: #fff;
}
@media (max-width: 640px) {
  .navbar-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
