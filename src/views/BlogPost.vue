<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/posts'

import Layout from '../components/Layout.vue' 
const route = useRoute()

const location = route.fullPath
const siteTitle = ref('Alerta RD')

const postStore = usePostStore()

watchEffect(
    () => {
        const { id } = route.query
        postStore.getOne(id);
    }
);

</script>
<template>
    <Layout :title="siteTitle" :location="location">
        <div v-if="postStore.isLoading" class="loader">
            <img src="../assets/loader.gif"/>
        </div>
        <article
            class="blog-post"
            itemScope
            itemType="http://schema.org/Article"
            v-else
        >
            <header>
                <h1 itemProp="headline">{{postStore.post.title}}</h1>
                <p>{{postStore.post.date}}</p>
            </header>
            <section class="media-section" v-show="postStore.post.media_url">
                <img :src="postStore.post.media_url" v-if="postStore.post.media_type === 'IMAGE'"/>
                <video controls v-else>
                    <source :src="postStore.post.media_url" type="video/mp4">
                    Your browser does not support HTML video.
                </video>
            </section>
            <section
                itemProp="articleBody"
            >
                {{ postStore.post.description }}
            </section>
            <hr />
        </article>
        <nav className="blog-post-nav" v-show="!postStore.isLoading">
        <ul
            :style="{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
            }"
        >
          <li v-if="postStore.previous">
              <router-link :to="{ path: `/${postStore.previous.slug}`, query: { id: postStore.previous.id }}" rel="prev">
                ← {{postStore.previous.title}}
              </router-link>
          </li>
          <li v-if="postStore.next">
              <router-link :to="{ path: `/${postStore.next.slug}`, query: { id: postStore.next.id }}" rel="next">
                {{postStore.next.title}} →
              </router-link>
          </li>
        </ul>
      </nav>
    </Layout>
</template>


