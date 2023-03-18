<script setup>
import { onMounted , ref } from 'vue'
import { usePostStore } from '../store/posts'
import { useRoute } from 'vue-router';
import CommentsSection from '../components/CommentsSection.vue';

const postStore = usePostStore()
const route = useRoute()

onMounted (
    () => {
        const { slug } = route.params
        postStore.getOne(slug);
    }
);
</script>
<template>
    <section class="section">
        <div v-if="postStore.isLoading" class="loader" style="margin-top: 5%;">
            <img src="../assets/loader.gif" />
        </div>
        <main class="container" v-else>
            <div class="row">
                <div class="col-xl-9 col-lg-8">
                    <article class="blog-post" itemScope itemType="http://schema.org/Article">
                        <div class="article-title">
                            <h1 itemProp="headline">{{ postStore.post.title }}</h1>
                        </div>
                        <p>{{ postStore.post.datetime }}</p>
                        <section class="media-section" v-show="postStore.post.mediaUrl">
                            <video class="media-responsive" controls v-if="postStore.post.mediaType === 'VIDEO'">
                                <source :src="postStore.post.mediaUrl" type="video/mp4">
                                Your browser does not support HTML video.
                            </video>
                            <img class="media-responsive" :src="postStore.post.mediaUrl" v-else />
                        </section>
                        <section itemProp="articleBody" class="entry-content">
                           <p> {{ postStore.post.description }} </p>
                        </section>
                        <hr />
                    </article>
                    <CommentsSection />
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
        </main>
    </section>
</template>