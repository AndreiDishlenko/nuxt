<template>
    <div class=""><b>Основной шаблон1</b></div>

    <header>Это шапка сайта</header>
    <NuxtPage/>
    <footer>Это подвал сайта1</footer>
</template>

<script setup>
</script>

<!-- <script setup lang="ts">
    const route = useRoute();
    useHead({
        meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
    });
</script> -->

<script>
    export default {
    }
</script>

<style lang="scss">
    $background: #cccccc;
    .body {
        background-color: $background;
    }
</style>
