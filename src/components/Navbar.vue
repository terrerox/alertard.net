<template>
  <section class="section-navigation mb-4">
      <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link" href="#">Inicio <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Nacionales</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Extranjeras</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Deportes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Curiosas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Educación sexual</a>
            </li>
          </ul>
        </div>
      </nav>
  </section>
</template>