<script setup>
import { usePostStore } from '../store/posts'

const postStore = usePostStore()
</script>
<template>
    <section class="col-12 order-3 order-lg-0 mb-3 mb-lg-4 mb-xl-5">
        <div class="row no-gutters home-top-headlines py-3 px-2 mb-3 mb-sm-0">
            <div 
                class="col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0"
                v-for="post in postStore.heroPosts"
                :key="post.slug"
            >
                <div class="row align-items-center no-gutters">
                    <div class="col-auto">
                        <img class="float-left mr-2" :src="post.instagramThumbnailUrl" width="50" />
                    </div>
                    <div class="col">
                        <div class="font-weight-bold">{{post.title}}</div>
                        <div class="post-date">
                            <i class="fa fa-clock-o" aria-hidden="true"></i> {{ post.datetime }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>