<template>
    
    <div class="">
        Это страница About
    </div>
    <div class="">
        <NuxtLink to="/">На главную</NuxtLink>
    </div>
    <div class="">
        <NuxtLink :to="previousPage">Вернуться назад</NuxtLink>
    </div>
       
</template>

<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const previousPage = route.query.from || '/'; 
</script>

<script>
    export default {
        
    }
</script>

<style lang="">
    
</style>