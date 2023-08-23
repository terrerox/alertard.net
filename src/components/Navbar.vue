<template>
  <section class="section-navigation mb-4">
      <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categoria/alertard" class="nav-link">Nacionales</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categoria/alertainternacional" class="nav-link">Extranjeras</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categoria/alertadeportiva" class="nav-link">Deportes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categoria/alertacuriosa" class="nav-link">Curiosas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/categoria/alertasexual" class="nav-link">Educación sexual</router-link>
            </li>
          </ul>
        </div>
      </nav>
  </section>
</template>