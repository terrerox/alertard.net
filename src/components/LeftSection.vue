<script setup>
import { usePostStore } from '../store/posts'
import { categoryTitles } from '../helpers';
import { useRouter } from 'vue-router';
const router = useRouter()

function goToPost(slug) { 
  router.push({ path: slug })
}
const postStore = usePostStore()
</script>
<template>
    <div class="col-12 order-1 order-lg-1 col-sm-5 col-lg-3 col-xl-2 border-right mb-3 mb-lg-0">

        <div 
            class="post mb-3 pb-3"
            :class="[index < 2 && 'border-bottom']"
            v-for="(post, index) in postStore.rightPosts"
            :key="post.slug"
        >
            <div class="post-header">
                <div class="post-supertitle">{{ categoryTitles[post.category] }}</div>
                <div class="post-title h4 font-weight-bold" @click="goToPost(post.slug)">{{ post.title }}</div>
            </div>
            <div class="post-body">
                <div class="post-content">{{ post.preview }}</div>
                <div class="post-date">
                    <i class="fa fa-clock-o" aria-hidden="true"></i> {{ post.datetime }}
                </div>
            </div>
        </div>
    </div>
</template>