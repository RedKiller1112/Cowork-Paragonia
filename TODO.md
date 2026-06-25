# TODO - Ajustes UX/UI Cowork Patagonia

## Historial previo (completado)
- [x] Actualizar store global con datos de perfil extendidos (nombre, apellido, correo, teléfono) y lógica de nombre visible solo cuando esté guardado.
- [x] Agregar precios CLP empresariales en `espacios.json`.
- [x] Actualizar `EspacioCard.vue` para mostrar precio CLP.
- [x] Modificar `Reservas.vue` para redirigir a `MiPerfil` al reservar.
- [x] Mejorar `MiPerfil.vue` con formulario extendido y botón WhatsApp solo con reservas.
- [x] Rediseñar `Inicio.vue` con 7 FAQs visibles (pregunta+respuesta directa), dinámico/futurista.
- [x] Ejecutar build para validar.
- [x] Actualizar TODO con estado final.

## Nuevo alcance (fecha/hora + disponibilidad)
- [ ] Actualizar `EspacioCard.vue` para solicitar fecha y hora por reserva y emitir ambos datos.
- [ ] Actualizar `Reservas.vue` para validar disponibilidad (id + fecha + hora) y mostrar mensaje de no disponible.
- [ ] Actualizar `userStore.js` para permitir múltiples reservas por espacio en distintos horarios y bloquear duplicado exacto.
- [ ] Actualizar `MiPerfil.vue` para mostrar fecha y hora de cada reserva.
- [ ] Ejecutar build para validar.
- [ ] Actualizar TODO con estado final del nuevo alcance.
