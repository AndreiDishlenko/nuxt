<template>
    
    <div class="">
        Это страница About3
    </div>
    <div class="">
        <a href="/">На главную</a>
        <!-- <NuxtLink to="/">На главную</NuxtLink> -->
    </div>
    <!-- <div class="">
        <NuxtLink :to="previousPage">Вернуться назад</NuxtLink>
    </div> -->

</template>

<script setup>
    // import { useRoute } from 'vue-router';

    // const route = useRoute();
    // const previousPage = route.query.from || '/'; 
    useHead({
        title: 'About',
        meta: [
            { name: 'description', content: 'Это описание главной страницы моего сайта.' },
            { name: 'keywords', content: 'сайт, главная, nuxt 3' },
        ],
    });
</script>

<script>
    export default {
        
    }
</script>

<style lang="">
    
</style>