<template>

<!-- Popup menu -->
<div :class="['popup-menu', 'apple-shadow', isMenuVisible ? '' : 'collapsed']">
    <div class="top-line">
        <div class="d-flex justify-content-between container">
            <div class="flex-grow-1 bold-1 ">
                <Icon name="ri:telegram-2-line" size="1em" class="me-1"/>Київ1
            </div>
            <div class="flex-grow-2 d-none d-lg-block text-center f-2">Більш ніж 5 років ми виробляємо ті самі конструкції з металу, які всім потрібні</div>
            <div class="flex-grow-1 bold-1 text-end flex-grow-1">+38(067) 777-77-77</div>
        </div>
    </div>
    <div class="menu-line f-3">
        <div class="h-100 d-flex justify-content-between align-items-center container">
            <div class="w-25 d-none d-lg-block">
                <NuxtImg src="/img/logo_popupmenu.png" alt="Steel Master логотип"/>
            </div>
            <div class="w-50 d-flex flex-grow-1 justify-content-between text-uppercase bold-1 text-black">
                <a href="#about">О компанії</a>
                <a href="#services">Послуги</a>
                <a href="#product">Виробництво</a>
                <a href="#project">Проектування</a>
            </div>
            <div class="w-25 d-none d-md-block text-end">
                <button class="text-uppercase f-4 bold-3">Залишити заявку</button>
            </div>
        </div>
    </div>
</div>

<div class="wrapper">

    <!-- Main block -->
    <div class="d-center vh-height bg-dark text-light">
        <div class="main-block container py-5">

            <!-- Header -->
            <div class="header p-0">
                <div class="logo"><NuxtImg src="/img/logo_header.png" alt="Steel Master логотип" height="49px"/></div>
                <div class="items d-none d-lg-flex">
                    <a href="#about" class="f-2">О компанії</a>
                    <a href="#services" class="f-2">Послуги</a>
                    <a href="#product" class="f-2">Виробництво</a>
                    <a href="#project" class="f-2">Проектування</a>
                </div>
                <div class="location d-flex align-items-center justify-content-end text-end flex-grow-1">
                        <Icon name="ri:telegram-2-line" size="1rem" class="pe-4" style="color: yellow;" />
                        <div class="ps-2 me-3 bold-1 ">Київ</div>
                        <LangSelector class="pe-3"/>
                        <!-- <div class="d-md-none"> -->
                            <Icon name="stash:burger-classic" class="d-lg-none"/>
                        <!-- </div> -->
                        
                </div>                

            </div>

            <!-- Benefits -->
            <div class="benefits bigger w-100 w-lg-75 w-xl-50">
                <div class="f2 thin-1">Від 2 тижднів<div class="separator mt-2"></div></div>
                <div class="f2 thin-1">Від 5000 грн<div class="separator mt-2"></div></div>
                <div class="f2 thin-1">Гарантія від 5 років<div class="separator mt-2"></div></div>
                <div class="f2 thin-1">По договору<div class="separator mt-2"></div></div>
            </div>

            <!-- Key slogan -->
            <div class="slogan">
                <div class="">
                    <h1>ВИГОТОВИМ БУДЬ-ЯКУ КОНСТРУКЦІЮ З МЕТАЛУ</h1>
                </div>
                <div class="bigger">Для  приватних будинків, котеджних містечок, комерційних підприємств</div>
            </div>

            <!-- Action button -->
            <button class="action-button mb-5 bold-2">ОТРИМАТИ БЕЗКОШТОВНУ КОНСУЛЬТАЦІЮ</button>

        </div>
    </div>

    <div id="about" class="vh-height d-center v-center">Блок первой страницы 2</div>
    <div id="services" class="vh-height d-center v-center">Блок первой страницы 3</div>
    <div id="product" class="vh-height d-center v-center">Блок первой страницы 4</div>

    <!-- Footer -->
    <div class="footer v-flex justify-content-between align-items-center vh-height-75 bg-dark text-light">
        <div id="project" class="d-center v-center bg-dark text-light flex-grow-1">Последний блок</div>

        <div class="d-flex align-items-center justify-content-between container text-white-75 border-bottom border-grey py-4">
            <div class="logo">
                <NuxtImg src="/img/logo_header.png" alt="Steel Master логотип" height="30px"/>
            </div>
            <div class="phone">380-67-777-77-77</div>
            <div class="email">support@steelmetal.com.ua</div>
            <div class="location">Київ</div>
            <div class="">
                <button class="text-uppercase f-4 bold-3">ЗАЛИШИТИ ЗАЯВКУ</button>
            </div>            
            <Icon name="logos:telegram"/>
            <!-- <Icon name="logos:facebook"/> -->
        </div>

        <div class="text-center container py-4 text-white-50">
            Все права защищены © 2016-2022 ТОВ "ТБК-1" - виготовлення мтеалоконструкцій на замовлення в Києві<br>
            Разработка и создание сайта - Personal Solutions Ltd.
        </div>
    </div>
    
</div>

</template>

<script setup>
    definePageMeta({
        layout: 'mainpage',
    });
    useHead({
        htmlAttrs: {
            lang: 'uk' // Указываем украинский язык для всего приложения
        },
        title: 'Home',
        meta: [
            { name: 'description', content: 'Это описание главной страницы моего сайта.' },
            { name: 'keywords', content: 'сайт, главная, nuxt 3' },
        ],
    });
</script>

<script>
    import { ref } from 'vue'
    import LangSelector from '~/components/langselector.vue'
    export default {
        components: {
            LangSelector
        },
        data: function() {
            return {
                language: 'uk',
                langs: ['uk', 'ru'],
				isMenuVisible : false,
            }
        },
        mounted: function() {
            console.log('mounted');
            window.addEventListener('scroll', this.handleScroll);
            this.getDefaultLanguage();
        },
        unmounted: function() {
            console.log('unmounted');
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll: function() {
                this.isMenuVisible = window.scrollY > 200;
            },
            getDefaultLanguage: function() {
                // console.log('getDefaultLanguage');                
                let result = localStorage.getItem('language');

                if (!result || !this.langs.includes(result))
                    result = 'uk';

                this.language = result;
            }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/styles/variables';

    .popup-menu {
        position: fixed;
        top: 0px;
        transition: top 0.5s ease 0s;

        width: 100%;
        height: 100px; 
        z-index: 100;
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items:stretch;
        
        padding-left: $wrapper-spacing;
        padding-right: $wrapper-spacing;
        
        border-bottom-left-radius: $blocks-radius;   
        border-bottom-right-radius: $blocks-radius;   
        a {
            color: black!important;
            font-weight: 600;
        }
        .top-line {
            height: 35px;
            display: flex;
            align-items: center;
            background-color: $secondary-background;
            color: white;
        }
        .menu-line {
            background-color: #cccccc;
            height: 65px;     
            border-bottom-left-radius: $blocks-radius;   
            border-bottom-right-radius: $blocks-radius;   
        }
    }
    .popup-menu.collapsed {
        top: -100px!important;
        transition: top 0.5s ease 0s;
    }

    .wrapper {
        border-radius: $wrapper-radius;
        margin: $wrapper-spacing;
    }

    .main-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom-left-radius: $blocks-radius;   
        border-bottom-right-radius: $blocks-radius;

        background-image: url('/img/mainpage_background.png');
        background-size: 740px 598px; /* или contain, если нужно подогнать изображение */
        background-position: right; /* позиция изображения */
        background-repeat: no-repeat; /* отключить повторение изображения */

        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: stretch;

            .logo {
                width:25%
            }
            .items {
                width: 50%;
                display: flex;
                justify-content: space-between;
                text-transform: uppercase;

                a {
                    color: white!important;
                }
            }
            .location {
                width: 25%;
                justify-content: end;
            }
        }

        .benefits {
            display: flex;
            justify-content: space-between;

            .separator {
                border: 1px solid #ECEF3F;
                width: 70px;
            }
        }

        .slogan {
            max-width: 75%;
        }

        .action-button {
            width:25rem;
        }

    }

    .footer {
        border-radius: $blocks-radius $blocks-radius $wrapper-radius $wrapper-radius;
    }
    
</style>
