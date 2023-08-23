<script setup>
import { usePostStore } from '../store/posts'
import { useRouter } from 'vue-router';
import { categoryTitles, goToPost } from '../helpers';

const router = useRouter()
const postStore = usePostStore()
const sidePromotion = postStore.sidePromotion
</script>
<template>
    <section class="section">
        <div class="container">

            <div class="row">
                <div class="col-xl-12">
                    <div class="section-header row">
                        <div class="col-12">
                            <h2 class="section-title h4 font-weight-bold font-alegreya">MÁS NOTICIAS</h2>
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
                                v-for="post in postStore.leftOver.slice(0,2)"
                                :key="post.slug"
                                class="post"
                                :class="[index === 0 && 'mb-3 pb-3 border-bottom']"
                            >
                                <div class="post-media" @click="goToPost(post, router)">
                                    <img class="img-fluid" :src="post.mediaUrl" />
                                </div>
                                <div class="post-header">
                                    <div class="post-supertitle">{{ categoryTitles[post.category] }}</div>
                                    <div class="post-title h4 font-weight-bold" @click="goToPost(post, router)">{{ post.title }}</div>
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
                                v-for="(post, index) in postStore.leftOver.slice(2, postStore.leftOver.length)"
                                :key="post.slug"
                                class="post mb-3 border-bottom"
                                :class="[(postStore.leftOver.length - 1) === index ? 'mb-sm-0' : 'pb-3']"
                            >
                                <div class="row">
                                    <div class="col-auto">
                                        <div class="post-media" @click="goToPost(post, router)">
                                            <img :src="post.mediaUrl" width="100">
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="post-header">
                                            <div class="post-title h5 font-weight-bold" @click="goToPost(post, router)">{{ post.title }}</div>
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
                                <img src="" class="img-fluid" />
                            </div>
                            <div class="widget-posts gradient-back text-white bg-light px-3 pb-3 pt-1 shadow ">

                                <div class="widget-header">
                                    <div class="widget-title">Latest</div>
                                </div>

                                <div 
                                    v-for="(post, index) in postStore.heroPosts"
                                    :key="post.slug"
                                    class="post clearfix"
                                    :class="[(postStore.heroPosts.length - 1) !== index && 'mb-3 pb-1 border-bottom']"
                                >
                                    <div class="post-media float-left mr-3" @click="goToPost(post, router)">
                                        <img :src="post.mediaUrl" width="75" />
                                    </div>
                                    <div class="post-header">
                                        <div class="post-title h6 font-weight-bold" @click="goToPost(post, router)">{{ post.title }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>