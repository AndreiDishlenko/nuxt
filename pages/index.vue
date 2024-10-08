<template>
  <div>
    <NuxtLoadingIndicator/>
    <div class="">Блок первой страницы 1</div>
    <div class="">Блок первой страницы 2</div>
    <div class="">Блок первой страницы 3</div>
    <div class="">Блок первой страницы 5</div>
    <a href="/about">About1</a>
    <!-- <NuxtLink to="/about">
        About page
    </NuxtLink> -->
    
    
    <!-- <NuxtLayout>
        some page content
    </NuxtLayout> -->
  </div>
</template>

<script setup lang="ts">
    useHead({
        // as a string,
        // where `%s` is replaced with the title
        titleTemplate: '%s - Site Title',
        title: 'My App',
        meta: [
            { name: 'description', content: 'Это описание главной страницы моего сайта.' },
            { name: 'keywords', content: 'сайт, главная, nuxt 3' },
        ],
        bodyAttrs: {
            class: 'body'
        },
        // script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
    })

    definePageMeta({
        title: 'Some Page1',
        layout: 'mainpage',
    })
</script>

<!-- <script setup>
    definePageMeta({ 
        layout: 'mainpage', // Указываем, что страница должна использовать макет "admin"
        title: 'Главная страница - Мой сайт',
        meta: [
            { name: 'description', content: 'Это описание главной страницы моего сайта.' },
            { name: 'keywords', content: 'сайт, главная, nuxt 3' },
            { property: 'og:title', content: 'Главная страница' },
            { property: 'og:description', content: 'Описание для социальных сетей' },
            { property: 'og:type', content: 'website' }
        ]
    });
</script> -->
