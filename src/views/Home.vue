<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/posts'
import Hero from '../components/Hero.vue'

import CenterSection from '../components/CenterSection.vue'
import LeftSection from '../components/LeftSection.vue'
import RightSection from '../components/RightSection.vue'

import PromotionBanner from '../components/Promotions/PromotionBanner.vue'

import CategorySection from '../components/CategorySection.vue'

const route = useRoute()
const location = route.fullPath

const siteTitle = ref('Alerta RD')

const postStore = usePostStore()

onMounted(() => {
  postStore.getAll();
});

</script>

<template>
  <div v-if="postStore.isLoading" class="loader" style="margin-top: 5%;">
    <img src="../assets/loader.gif" />
  </div>
  <main v-else>
    <section class="section mb-0 pb-5">
    <div class="container">
      <div class="row">
        <Hero />
        <LeftSection />
        <CenterSection />
        <RightSection />
      </div>
    </div>
  </section>
  <PromotionBanner />
  <CategorySection />
  </main>
</template>
