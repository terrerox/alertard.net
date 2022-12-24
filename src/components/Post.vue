<script setup>
defineProps({
  post: Object
})
</script>
<template>
    <li>
        <article
        class="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
        >
        <header>
            <h2>
            <router-link :to="{ path: `/${post.slug}`, query: { id: post.id }}" itemProp="url">
                <span itemProp="headline">{{post.title}}</span>
            </router-link>
            </h2>
            <small>{{post.date}}</small>
        </header>
        <section class="image-section" v-show="post.image_url">
            <img :src="post.image_url"/>
        </section>
        <section>
            <p>
            {{ post.preview }}
            </p>
        </section>
        </article>
    </li>
</template>