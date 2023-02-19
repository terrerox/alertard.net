<script setup>
const currentDate = new Date().toLocaleString('es', {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})
</script>
<template>
  <header class="header py-1">
    <div class="container">
      <div class="row justify-content-between align-items-center">
        <div class="col-12 col-lg-3 small">
          <div class="row no-gutters">
            <div class="col-6 col-lg-12">
              <div class="font-weight-bold">
                <i class="fa fa-calendar-o" aria-hidden="true"></i> {{ currentDate }}
              </div>
            </div>
            <div class="col-6 col-lg-12">
              <div class="text-right text-lg-left">
                Publicador: Alerta RD
              </div>
            </div>
          </div>
        </div>
        <router-link to="/" class="col-12 col-lg-6 text-center main-title">
          <img src="../assets/Logo-alerta-RD-fondo-rojo.jpg" alt="Logo alertard.net">
        </router-link>
        <div class="col-12 col-lg-3 text-center text-lg-right">
          @alertalosfrailes
        </div>
      </div>
    </div>
  </header>
</template>