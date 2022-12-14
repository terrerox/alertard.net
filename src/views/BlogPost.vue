<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/posts'

import Bio from "../components/Bio.vue"
import Layout from '../components/Layout.vue' 

const route = useRoute()
const { id } = route.query
const location = route.fullPath

const siteTitle = ref('Alerta Los Frailes')

const postStore = usePostStore()

watchEffect(() => {
    postStore.getOne(id);
});

</script>
<template>
    <Layout :title="siteTitle" :location="location">
        <article
            class="blog-post"
            itemScope
            itemType="http://schema.org/Article"
            v-if="!postStore.isLoading"
        >
            <header>
                <h1 itemProp="headline">{{postStore.post.title}}</h1>
                <p>{{postStore.post.date}}</p>
            </header>
            <section v-show="postStore.post.image_url">
                <img :src="postStore.post.image_url" class="post-image"/>
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


