<script setup>
import { usePostStore } from '../store/posts'
import { useRouter } from 'vue-router';
const router = useRouter()

function goToPost(slug) { 
  router.push({ path: slug })
}
const mainPost = usePostStore().mainPost
</script>
<template>
    <div class="col-12 order-0 order-lg-2 col-sm-7 col-lg-4 col-xl-6 border-right mb-3 mb-lg-0">

        <div class="post">
            <div class="post-header">
                <div class="post-supertitle">Photo by Davi Pimentel</div>
                <div class="post-title h3 font-weight-bold" @click="goToPost(mainPost.slug)">{{ mainPost.title }}</div>
            </div>
            <div class="post-media">
                <img class="img-fluid" :src="mainPost.instagramThumbnailUrl" />
            </div>
            <div class="post-body">
                <div class="post-content">{{ mainPost.description }}</div>
                <div class="post-date">
                    <i class="fa fa-clock-o" aria-hidden="true"></i> {{ mainPost.datetime }}
                </div>
            </div>
        </div>
    </div>
</template>