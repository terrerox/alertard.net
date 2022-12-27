<script setup>
const { location } = defineProps({
    location: String,
    title: String
})

const isRootPath = location === '/'
const fullYear = new Date().getFullYear()
</script>

<template>
    <div class="global-wrapper" data-is-root-path={isRootPath}>
      <header class="global-header">
        <h1 class="main-heading" v-if="isRootPath">
            <router-link to="/">{{title}}</router-link>
        </h1>
        <router-link class="header-link-home" to="/" v-else>
            {{title}}
        </router-link>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        © {{fullYear}}
        <a target="_black" href="https://www.instagram.com/alertalosfrailes/">Alerta RD</a>
      </footer>
    </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
