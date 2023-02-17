<script setup>
import { watchEffect } from 'vue'
import { usePostStore } from '../store/posts'
import { useRoute, useRouter } from 'vue-router';
import { categoryTitles } from '../helpers';

const postStore = usePostStore()
const route = useRoute()
const router = useRouter()

function goToPost(slug) { 
  router.push({ path: `/${slug}` , replace: false })
}

watchEffect (
    () => {
        const { category } = route.params
        postStore.getByCategory(category);
    }
);
</script>
<template>
    <div v-if="postStore.isLoading" class="loader" style="margin-top: 5%;">
        <img src="../assets/loader.gif" />
    </div>
    <main v-else class="section">
        <div class="container">

            <div class="row">
                <div class="col-xl-12">
                    <div class="section-header row">
                        <div class="col-12">
                            <h2 class="section-title h4 font-weight-bold font-alegreya">{{ categoryTitles[postStore.category] }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4"></div>
            </div>

            <div class="row">
                <div class="col-xl-9 col-lg-8">
                    <div class="row">
                        <div class="col-12 col-md-5 mb-3 mb-md-0">

                            <div 
                                class="post"
                                :class="[index === 0 && 'mb-3 pb-3 border-bottom']"
                                v-for="(post, index) in postStore.postsByCategories.slice(0,2)"
                                :key="post.slug"
                            >
                                <div class="post-media" @click="goToPost(post.slug)">
                                    <img class="img-fluid" :src="post.instagramThumbnailUrl" />
                                </div>
                                <div class="post-header">
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
                        <div class="col-12 col-md-7">

                            <div 
                                class="post mb-3 border-bottom"
                                v-for="(post, index) in postStore.postsByCategories.slice(2, postStore.postsByCategories.length)"
                                :class="[(postStore.postsByCategories.length - 1) === index ? 'mb-sm-0' : 'pb-3']"
                                :key="post.slug"
                            >
                                <div class="row">
                                    <div class="col-auto">
                                        <div class="post-media" @click="goToPost(post.slug)">
                                            <img :src="post.instagramThumbnailUrl" width="100">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="post-header">
                                            <div class="post-title h5 font-weight-bold" @click="goToPost(post.slug)">{{ post.title }}</div>
                                        </div>
                                        <div class="post-body">
                                            <div class="post-content">{{ post.preview }}</div>
                                            <div class="post-date">
                                                <i class="fa fa-clock-o" aria-hidden="true"></i> {{ post.datetime }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4">
                    <div class="sticky-sidebar">
                        <div class="sticky-inside">
                            <div class="banner banner-sidebar mb-3 bg-light text-center">
                                <img :src="postStore.sidePromotion.image.url" class="img-fluid" />
                            </div>
                            <div class="widget-posts gradient-back text-white bg-light px-3 pb-3 pt-1 shadow ">

                                <div class="widget-header">
                                    <div class="widget-title">Promocionate aquí</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>