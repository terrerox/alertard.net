<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <Header />
  <section class="section-navigation mb-4">
    <div class="">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link" href="#">Inicio <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Próximamente</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Próximamente</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Próximamente</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Próximamente</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0 d-none">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
  </section>
  <router-view></router-view>
</template>
