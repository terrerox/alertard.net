<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/posts'
import Station from '../components/Station.vue' 
import Layout from '../components/Layout.vue' 
import Post from '../components/Post.vue' 

const route = useRoute()
const location = route.fullPath

const siteTitle = ref('Alerta RD')

const postStore = usePostStore()

onMounted(() => {
  postStore.getAll();
});

</script>

<template>
    <Layout :title="siteTitle" :location="location">
      <Station />
      <div v-if="postStore.isLoading" class="loader" style="margin-top: 5%;">
            <img src="../assets/loader.gif"/>
      </div>
      <ol style="listStyle: none" v-else>
        <Post 
          v-for="post in postStore.posts"
          :key="post.slug"
          :post="post"
        />
      </ol>
    </Layout>
</template>
