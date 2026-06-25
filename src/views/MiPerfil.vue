<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import BotonAccion from '../components/BotonAccion.vue'

const userStore = useUserStore()
const mensajeGuardado = ref('')
const metodosPagoRef = ref(null)

const perfilTemporal = reactive({
  nombre: userStore.perfil.nombre || '',
  apellido: userStore.perfil.apellido || '',
  correo: userStore.perfil.correo || '',
  telefono: userStore.perfil.telefono || ''
})

const errores = reactive({
  nombre: '',
  correo: '',
  telefono: ''
})

const precioCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0
})

const nombreCompleto = computed(() => {
  const nombre = userStore.perfil.nombre?.trim() || ''
  const apellido = userStore.perfil.apellido?.trim() || ''
  return `${nombre} ${apellido}`.trim() || 'Usuario sin nombre'
})

const totalPagar = computed(() => {
  return userStore.reservas.reduce((acumulado, reserva) => acumulado + (reserva.precio || 0), 0)
})

const whatsappLink = computed(() => {
  const nombreMensaje = nombreCompleto.value === 'Usuario sin nombre' ? 'usuario interesado' : nombreCompleto.value
  const mensaje = `Hola soy ${nombreMensaje}, quería consultar sobre Cowork Patagonia y mis reservas.`
  return `https://wa.me/56936107090?text=${encodeURIComponent(mensaje)}`
})

const validarPerfil = () => {
  errores.nombre = ''
  errores.correo = ''
  errores.telefono = ''

  const nombre = perfilTemporal.nombre.trim()
  const correo = perfilTemporal.correo.trim()
  const telefono = perfilTemporal.telefono.trim()

  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const telefonoChileRegex = /^\+56\d{9}$/

  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio.'
  }

  if (!correoRegex.test(correo)) {
    errores.correo = 'Ingresa un correo válido (ej: nombre@empresa.cl).'
  }

  if (!telefonoChileRegex.test(telefono)) {
    errores.telefono = 'Ingresa teléfono chileno válido: +56 seguido de 9 dígitos (ej: +56912345678).'
  }

  return !errores.nombre && !errores.correo && !errores.telefono
}

const guardarPerfil = () => {
  if (!validarPerfil()) return

  userStore.guardarPerfil({
    nombre: perfilTemporal.nombre.trim(),
    apellido: perfilTemporal.apellido.trim(),
    correo: perfilTemporal.correo.trim(),
    telefono: perfilTemporal.telefono.trim()
  })

  mensajeGuardado.value = 'Tus datos han sido guardados, por favor continúa en la sección Reservas.'
}

const limpiarDatos = () => {
  userStore.limpiarPerfilYReservas()
  perfilTemporal.nombre = ''
  perfilTemporal.apellido = ''
  perfilTemporal.correo = ''
  perfilTemporal.telefono = ''
  errores.nombre = ''
  errores.correo = ''
  errores.telefono = ''
  mensajeGuardado.value = 'Perfil y reservas reiniciados. Puedes comenzar una nueva reserva desde cero.'
}

const irAMetodosPago = () => {
  metodosPagoRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section>
    <h1>Mi Perfil</h1>

    <div class="perfil">
      <label for="nombre">Nombre</label>
      <input id="nombre" v-model="perfilTemporal.nombre" type="text" placeholder="Ej: María" />
      <p v-if="errores.nombre" class="error">{{ errores.nombre }}</p>

      <label for="apellido">Apellido</label>
      <input id="apellido" v-model="perfilTemporal.apellido" type="text" placeholder="Ej: Torres" />

      <label for="correo">Correo</label>
      <input id="correo" v-model="perfilTemporal.correo" type="email" placeholder="Ej: correo@empresa.cl" />
      <p v-if="errores.correo" class="error">{{ errores.correo }}</p>

      <label for="telefono">Número de contacto</label>
      <input
        id="telefono"
        v-model="perfilTemporal.telefono"
        type="tel"
        placeholder="Ej: +56912345678"
        inputmode="numeric"
      />
      <p v-if="errores.telefono" class="error">{{ errores.telefono }}</p>

      <div class="acciones-perfil">
        <BotonAccion texto="Guardar cambios de perfil" @accion="guardarPerfil" />
        <button class="btn-limpiar" type="button" @click="limpiarDatos">Limpiar perfil y reservas</button>
      </div>

      <p v-if="mensajeGuardado" class="mensaje-ok">{{ mensajeGuardado }}</p>

      <RouterLink class="btn-reservar-otro" to="/reservas">+ Reservar otro espacio</RouterLink>
    </div>

    <div class="reservas">
      <h2>Mis reservas</h2>
      <ul v-if="userStore.reservas.length > 0">
        <li v-for="reserva in userStore.reservas" :key="`${reserva.id}-${reserva.fecha}-${reserva.hora}`">
          <strong>{{ reserva.nombre }}</strong> - {{ reserva.ubicacion }} ({{ reserva.capacidad }} personas) -
          {{ reserva.fecha }} a las {{ reserva.hora }} - {{ precioCLP.format(reserva.precio || 0) }} -
          reservado a nombre de {{ nombreCompleto }}
        </li>
      </ul>
      <p v-else>Aún no tienes reservas registradas.</p>

      <p v-if="userStore.reservas.length > 0" class="total-pagar">
        Total a pagar: <strong>{{ precioCLP.format(totalPagar) }}</strong>
      </p>

      <button v-if="userStore.reservas.length > 0" class="btn-pagar" type="button" @click="irAMetodosPago">
        Pagar
      </button>

      <div v-if="userStore.reservas.length > 0" ref="metodosPagoRef" class="metodos-pago">
        <h3>Métodos de pago y confirmación de reserva</h3>
        <p>
          Para finalizar tu reserva, indícanos por WhatsApp la <strong>fecha</strong> y <strong>hora</strong> que
          necesitas. Si pagas por transferencia, te confirmaremos por la misma vía.
        </p>
        <ul>
          <li>Transferencia BancoEstado: cuenta 18454566</li>
          <li>RUT empresa: 18454566-7</li>
          <li>Webpay Empresas</li>
          <li>Pago con orden de compra corporativa</li>
        </ul>
      </div>

      <a
        v-if="userStore.reservas.length > 0"
        class="btn-whatsapp"
        :href="whatsappLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 ¿Tienes dudas? Escríbenos al WhatsApp
      </a>
    </div>
  </section>
</template>

<style scoped>
.perfil {
  display: grid;
  gap: 10px;
  max-width: 560px;
}
input {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
}
.error {
  margin: -4px 0 2px 0;
  color: #b91c1c;
  font-size: 0.9rem;
  font-weight: 600;
}
.acciones-perfil {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn-limpiar {
  border: 1px solid #ef4444;
  background: #fff;
  color: #b91c1c;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
}
.mensaje-ok {
  margin: 0;
  padding: 10px 12px;
  border-radius: 10px;
  color: #065f46;
  background: #d1fae5;
  border: 1px solid #86efac;
  font-weight: 600;
}
.btn-reservar-otro {
  text-decoration: none;
  display: inline-block;
  margin-top: 4px;
  color: #1d4ed8;
  font-weight: 700;
}
.reservas {
  margin-top: 24px;
}
ul {
  padding-left: 20px;
}
li {
  margin-bottom: 10px;
}
.total-pagar {
  margin-top: 12px;
  padding: 10px 12px;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  border-radius: 10px;
}
.btn-pagar {
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
.metodos-pago {
  margin-top: 14px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #c7d2fe;
  background: #eef2ff;
}
.metodos-pago h3 {
  margin: 0 0 8px 0;
}
.metodos-pago p {
  margin: 0 0 8px 0;
}
.metodos-pago ul {
  margin: 0;
  padding-left: 18px;
}
.btn-whatsapp {
  display: inline-block;
  margin-top: 14px;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  background: #25d366;
  color: #fff;
}
</style>
