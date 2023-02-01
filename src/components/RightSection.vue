<script setup>
import { usePostStore } from '../store/posts'

const postStore = usePostStore()
const advertisment = postStore.advertisment

const assignClass = (index) => {
    return (index === 0 && 'mb-3') || (index === 1 && 'mb-3 pb-3 border-bottom') || ''
}
</script>
<template>
    <div class="col-12 order-2 order-lg-3 col-sm-12 col-lg-5 col-xl-4 mb-3 mb-lg-0 ">
        <div class="mb-5 text-center bg-hard-light">
            <div class="small" style="background-color: rgba(0,0,0,0.05)"><span
                    class="text-muted font-alegreya">ADVERTISMENT</span></div>
            <div class="py-2">
                <img :src="advertisment.image.url" class="img-fluid" />
            </div>
        </div>
        <div 
            class="post"
            :class="assignClass(index)"
            v-for="(post, index) in postStore.rightPosts"
            :key="post.slug"
        >
            <div class="post-media float-left mr-3">
                <img :src="post.instagramThumbnailUrl" width="75" />
            </div>
            <div class="post-header">
                <div class="post-title h5 font-weight-bold">{{ post.title }}</div>
            </div>
            <div class="post-body">
                <div class="post-content">{{ post.preview }}</div>
            </div>
        </div>
    </div>
</template>