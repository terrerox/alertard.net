<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/posts'
import Station from '../components/Station.vue' 
import Layout from '../components/Layout.vue' 
import Post from '../components/Post.vue' 

const route = useRoute()
const location = route.fullPath

const siteTitle = ref('Alerta Los Frailes')

const postStore = usePostStore()

onMounted(() => {
  postStore.getAll();
});

</script>

<template>
    <Layout :title="siteTitle" :location="location">
      <Station />
      <ol style="listStyle: none">
        <Post 
          v-for="post in postStore.posts"
          :key="post.slug"
          :post="post"
        />
      </ol>
    </Layout>
</template>
