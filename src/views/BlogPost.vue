<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/posts'

import Bio from "../components/Bio.vue"
import Layout from '../components/Layout.vue' 
const route = useRoute()

const location = route.fullPath
const siteTitle = ref('Alerta Los Frailes')

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
            <section class="image-section" v-show="postStore.post.image_url">
                <img :src="postStore.post.image_url"/>
            </section>
            <section
                itemProp="articleBody"
            >
                {{ postStore.post.description }}
            </section>
            <hr />
            <footer>
                <Bio />
            </footer>
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


