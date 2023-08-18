<script setup>
import { usePostStore } from '../store/posts'
import { useRouter } from 'vue-router';

import Advertisment from './Promotions/Advertisment.vue';
const router = useRouter()

function goToPost(slug) { 
  router.push({ path: slug })
}
const postStore = usePostStore()

const assignClass = (index) => {
    return (index === 0 && 'mb-3') || (index === 1 && 'mb-3 pb-3 border-bottom') || ''
}
</script>
<template>
    <div class="col-12 order-2 order-lg-3 col-sm-12 col-lg-5 col-xl-4 mb-3 mb-lg-0 ">
        <Advertisment />
        <div 
            class="post"
            :class="assignClass(index)"
            v-for="(post, index) in postStore.rightPosts"
            :key="post.slug"
        >
            <div class="post-media float-left mr-3" @click="goToPost(post.slug)">
                <img :src="post.mediaUrl" width="75" />
            </div>
            <div class="post-header">
                <div class="post-title h5 font-weight-bold" @click="goToPost(post.slug)">{{ post.title }}</div>
            </div>
            <div class="post-body">
                <div class="post-content">{{ post.preview }}</div>
            </div>
        </div>
    </div>
</template>