<template>

    <PopupMenu :content="mainMenu"/>

    <div class="wrapper">

        <!-- Main block -->
        <div class="d-center vh-height bg-dark text-light">
            <MainBlock :header="mainMenu"/>
        </div>

        <!-- About -->
        <div id="about" class="about-block vh-height py-5">

            <div class="container px-5 pt-5">
                <div class="v-flex align-items-center align-items-lg-start d-md-flex pb-5">
                    <div class="v-flex w-100 w-md-50 pe-md-3">
                        <h2>{{ $t('О компанії') }}</h2>
                        
                        <div class="text-justify">
                            <p>{{ $t('about1') }}</p>
                            <p>{{ $t('about2') }}</p>
                            <p>{{ $t('about3') }}</p>
                            <p>{{ $t('about4') }}</p>
                        </div>

                    </div>
                    <div class="ps-3 w-100 p-3 p-md-0 w-md-50 ps-md-3">
                        <NuxtImg src="/img/mainpage_collage.png" alt="About ТБК1 Image" class="w-100"/>
                    </div>
                </div>

                <div class="v-flex pb-5">
                    <div class="d-block d-md-flex pb-md-5">
                        <div class="rectangle-header w-md-50 pe-md-3">
                            <h4 class="bold-6 text-black-50 py-2">{{ $t('МАТЕРІАЛИ') }}</h4>
                            <p>{{ $t('У роботі використовуємо тільки перевірені і якісні матеріали. Перевірені роками постачальники забезпечують максимально швидке постачання.')}}</p>
                        </div>
                        <div class="rectangle-header  w-md-50 ps-md-3">
                            <h4 class="bold-6 text-black-50 py-2">{{ $t('ПРОЦЕС') }}</h4>
                            <p>{{ $t('Маємо власне виробництво: від різання і складання, до доставки та монтажу. Ми повністю керуємо всіма процесами, даємо гарантію і особисто відповідаємо за якість своїх робіт.')}}</p>
                        </div>
                    </div>
                    <div class="d-block d-md-flex">
                        <div class="rectangle-header w-md-50 w-md-50 pe-md-3">
                            <h4 class="bold-6 text-black-50 py-2">{{ $t('23 РОКИ НА РИНКУ') }}</h4>
                            <p>{{ $t('Ми створюємо металоконструкції з 2001 р. За цей час ми намагалися зарекомендували себе тільки з хорошого боку і завжди знаходити підхід до клієнта.')}}</p>
                        </div>
                        <div class="rectangle-header  w-md-50 ps-md-3">
                            <h4 class="bold-6 text-black-50 py-2">{{ $t('500+ ОБ\'ЄКТІВ') }}</h4>
                            <p>{{ $t('Наші вироби з металу радують око не тільки в приватних будинках, а й на літніх майданчики, комерційних підприємствах, виробничих приміщеннях та багатоквартирних будинках.')}}</p>
                        </div>
                    </div>
                </div>

                <div class="d-center flex-grow-1 text-center pb-4">
                    <button class="action-button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">{{ $t('Замовити дзвінок') }}</button>
                </div>
            </div>

        </div>

        <!-- Our works - photos -->
        <div id="ourworks" class="ourworks py-5">
            <div class="container px-4 py-5">
                <Collage/>
            </div>
        </div>    

        <!-- Our services -->
        <div id="services" class="services vh-height d-center v-center py-5">
            <div class="container px-4 py-5 v-flex align-items-center">
                <div class="pb-4">
                    <h2>{{ $t('Що ми робимо?')}}</h2>
                </div>
                <div class="v-flex">
                    <div class="v-flex d-lg-flex">
                        <div class="w-100 w-lg-50 pe-lg-4 d-flex pb-4">
                            <div class="pe-4"><NuxtImg src="/img/services/facades.png" layout="intrinsic"/></div>
                            <div class="text-justify">
                                <h3>{{ $t('Скляні, вентильовані фасади')}}</h3>
                                {{ $t('facades_desc') }}
                            </div>
                        </div>
                        <div class="w-100 w-lg-50 ps-lg-4 d-flex pb-4">
                            <div class="pe-4"><NuxtImg src="/img/services/autotents.png" layout="intrinsic"/></div>
                            <div class="text-justify">
                                <h3>{{ $t('Автомобільні навіси')}}</h3>
                                {{ $t('navesi_desc') }}
                            </div>
                        </div>
                    </div>
                    <div class="v-flex d-lg-flex">
                        <div class="w-100 w-lg-50 pe-lg-4 d-flex pb-4">
                            <div class="pe-4"><NuxtImg src="/img/services/parkan.png" layout="intrinsic"/></div>
                            <div class="text-justify">
                                <h3>{{ $t('Паркани, огорожі')}}</h3>
                                {{ $t('parkani_desk') }}
                            </div>
                        </div>
                        <div class="w-100 w-lg-50 ps-lg-4 d-flex pb-4">
                            <div class="pe-4"><NuxtImg src="/img/services/stairs.png" layout="intrinsic"/></div>
                            <div class="text-justify">
                                <h3>{{ $t('Сходи')}}</h3>
                                {{ $t('shodi_desc') }}
                            </div>
                        </div>
                    </div>
                    <div class="v-flex d-lg-flex">
                        <div class="d-flex w-lg-50 pe-lg-4 pb-4">
                            <div class="pe-4"><NuxtImg src="/img/services/vorota.png" layout="intrinsic"/></div>
                            <div class="text-justify">
                                <h3>{{ $t('Розсувні ворота')}}</h3>
                                {{ $t('vorota_desc') }}
                            </div>
                        </div>
                        <div class=" d-flex w-lg-50 ps-lg-4 pb-4">
                            <div class="pe-4"><NuxtImg src="/img/services/doors.png" layout="intrinsic"/></div>
                            <div class="text-justify">
                                <h3>{{ $t('Двері, хвіртки')}}</h3>
                                {{ $t('dveri_desc') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Project now -->
        <div class="projecting-block py-5">
            <div class="container px-4 w-100 w-sm-75 ">
                <h2>{{ $t('Спроектувати нестандартну металеву конструкцію')}}</h2>
                <p class="">{{ $t('* Надайте швидкий опис необхідної металевої конструкції')}}</p>
                <textarea id="big-text" name="big-text" rows="5" cols="50" class="w-100 mb-3"></textarea><br>
                <button class="action-button bold-2">{{ $t('Розрахувати')}}</button>
            </div>
        </div>

        <!-- Our technologies -->
        <div id="product" class="technologies-block vh-height d-center v-center  py-5">
            <div class="container px-4 pt-5 v-flex align-items-center">
                <div class="pb-4">
                    <h2>{{ $t('Технології')}}</h2>
                </div>
                <Technologies />
                <!-- <div class="text-center">
                    <button class="action-button">{{ $t('Обрати послугу')}}</button>
                </div> -->
            </div>
        </div>

        <!-- Our clients -->
        <div id="clients" class="bg-white">
            <div class="container py-5 my-4 px-0 px-md-5 v-flex align-items-center ">
                <div class="pb-4">
                    <h2>{{ $t('Нам довіряють')}}</h2>
                </div>           
                <Carousel />
            </div>
        </div>

        <!-- Work order -->
        <div class="workorder py-5">
            <div class="container px-4 py-5">
                <div class="pb-4">
                    <h2>{{ $t('Співпраця')}}</h2>
                </div>  
                <WorkOrderBlock />
            </div>
        </div>

        <!-- Footer -->
        <div class="footer v-flex justify-content-between align-items-center vh-height-75 bg-dark pt-5">

            <!-- squeeze -->
            <div id="project" class="container w-100 w-sm-75 px-4 my-5">
                <SqueezeBlock/>
            </div>

            <!-- Contacts -->
            <div class="container d-flex transformer justify-content-between align-items-center align-items-md-start main-color-darkmode border-bottom border-grey pt-4 pb-5 pb-md-3">
                <!-- Phones -->
                <div class="v-flex align-items-center align-items-md-start pe-md-5">
                    <div class="d-flex">
                        <a :href="'tel:'+useRuntimeConfig().public.phone" class="dark pb-0 f3 bold-3 pe-3">{{ useRuntimeConfig().public.phone }}</a>
                        <a :href="'tg://resolve?domain='+useRuntimeConfig().public.tg" target="_blank" class="lh-1">
                            <Icon class="" name="logos:telegram"/>
                        </a>
                    </div>
                    <p class="f-3 text-white-50">Всі дзвінки згідно тарифного<br> плану вашого оператора</p>
                </div>
                <!-- Email -->
                <div class="v-flex align-items-center align-items-md-start pe-md-5">
                    <a :href="'mailto:'+useRuntimeConfig().public.email" class="dark pb-0 f3 bold-3">{{ useRuntimeConfig().public.email }}</a>
                    <p class="f-3 text-white-50">Написати нам</p>
                </div>
                <div class="v-flex align-items-center align-items-md-start pe-md-5">
                    <p class="dark pb-0 mb-0 f3 bold-3">Пн-Пт з 9:00 до 19:00</p>
                    <p class="f-3 text-white-50">Графік роботи</p>
                </div>
                <div class="d-flex transformer align-items-center mb-3">
                    <p class="pe-0 pe-md-3 mb-2 mb-md-0">Маєте запитання?</p>
                    <button class="text-uppercase f-4 bold-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">{{ $t('Залишити заявку')}}</button>
                </div>
            </div>

            <!-- Copyrights -->
            <div class="container d-flex transformer align-items-center w-100">
                <div class="logo mt-4 mt-md-0">
                    <NuxtImg src="/img/logo_sm1_darkmode.png" alt="ТБК1 логотип" height="15px"/> 
                </div>
                <div class="f-3 text-center container py-4 text-white-50 text-light">
                    {{ $t('Усі права захищені © 2016-2022 ТОВ «ТБК-1» - виготовлення мтеалоконструкцій на замовлення в Києві')}}<br>
                    {{ $t('Розробка та створення сайту - Personal Solutions Ltd')}}
                </div>
            </div>

        </div>
        
    </div>

</template>

<script setup>
    definePageMeta({
        layout: 'mainpage'
    });
    const i18nHead = useLocaleHead({
        addSeoAttributes: {
            // canonicalQueries: ['foo']
        }
    });

    const { t } = useI18n();

    useHead({
        title: t('Виготовлення металоконструкцій Київ'),
        htmlAttrs: {
            lang: i18nHead.value.htmlAttrs.lang
        },
        link: [...(i18nHead.value.link || [])],
        meta: [...(i18nHead.value.meta || [])]
    //     meta: [
    //         { name: 'description', content: 'Это описание главной страницы моего сайта.' },
    //         { name: 'keywords', content: 'сайт, главная, nuxt 3' },
    //     ],

    });

</script>

<script>
    import PopupMenu from '~/components/popupmenu.vue'
    import MainBlock from '~/blocks/main.vue'
    import Collage from '~/components/collage.vue'
    import Technologies from '~/blocks/main_technologies.vue'
    import Carousel from '~/components/carousel.vue'
    import WorkOrderBlock from '~/blocks/main_workorder.vue'
    import SqueezeBlock from '~/blocks/main_squeeze.vue'
    
    export default {
        components: {
            MainBlock, PopupMenu, Collage, Technologies, Carousel, WorkOrderBlock, SqueezeBlock
        },
        data: function() {
            return {
                mainMenu: [
                    {text: 'О компанії', href: '#about'},
                    {text: 'Послуги', href: '#services'},
                    {text: 'Виробництво', href: '#product'},
                    {text: 'Проектування', href: '#project'},
                ],
				isMenuVisible : false,
            }
        },
        mounted: function() {
        },
        unmounted: function() {
            // console.log('unmounted');
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    .wrapper {
        border-radius: variables.$wrapper-radius;
        margin: variables.$wrapper-spacing;
    }

    .about-block {
        background: transparent linear-gradient(180deg,#fff,#f6f6f6) 0 0 no-repeat padding-box;
    }

    .rectangle-header h4 {
        background-image: url('/img/bg_rectangle.png');
        background-size: 50px;
        // background-position: center;
        background-repeat: no-repeat;
        height: 50px;
    }

    .services img {
        width: calc(63px + 30 * (100vw - 320px) / 1600);
    }

    .ourworks {
        border: 0px solid #e7e7e7;
        border-top-width: 1px;
        border-bottom-width: 1px;
        background-color: white;
        
    }

    .projecting-block {
        background-image: url('/img/background_projecting.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat; /* отключить повторение изображения */
    }

    .technologies-block {
        .background-image {
            height:150px; 
            background-repeat: no-repeat; 
            background-size:100%;
            color: white;
        }
        
    }

    .footer {
        border-radius: variables.$blocks-radius variables.$blocks-radius variables.$wrapper-radius variables.$wrapper-radius;
    }
    
</style>
