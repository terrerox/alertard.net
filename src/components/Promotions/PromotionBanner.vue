<script setup>
import { usePostStore } from '../../store/posts'

const banner = usePostStore().banner
</script>
<template>
  <section class="section bg-light my-3 my-md-4">
    <div class="container">
      <div class="row py-4">
        <div class="col text-center">
          <img :src="banner.image.url" v-if="banner.image" class="img-fluid" />
          <h3 v-else>Promocionate aquí</h3>
        </div>
      </div>
    </div>
  </section>
</template>