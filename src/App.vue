<script setup>
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'
import { getInstagramPosts } from './helpers'

const res = (async() => await getInstagramPosts())();
console.log(res)
</script>

<template>
  <Header />
  <Navbar />
  <router-view></router-view>
</template>
