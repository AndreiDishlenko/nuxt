<template>

<PopupMenu :content="mainMenu"/>

<SideMenu ref="sidemenu" :content="mainMenu"/>

<div class="wrapper">

    <!-- Main block -->
    <div class="d-center vh-height bg-dark text-light">
        <MainBlock :header="mainMenu"/>
    </div>

    <!-- About -->
    <div id="about" class="vh-height d-center v-center v-flex container p-5 my-5">
        <div class="d-flex mb-5">
            <div class="v-flex pe-3 w-100 w-md-50">
                <div class=""><h2>{{ $t('О компанії') }}</h2></div>
                <div class="">
                    <p>Компанія “ТБК-1” була заснована в 2003 р.</p>
                    <p>Виконуємо роботи будь-якої складності, пов’язані з металоконструкціями для об’єктів житлового будівництва, приватного сектору, котеджних містечок, бізнесу та виробничих підприємств.</p>
                    <p>Проектуєм, виготовляєм, привозим, монтуєм.</p>
                    <p>Співпрацюєм з будівельними копаніями, підрядними організаціями та кінцевим споживачем.</p>
                </div>
                <div class="">
                    <button>{{ $t('ЗАМОВИТИ ДЗВІНОК') }}</button>
                </div>
            </div>
            <div class="ps-3 w-50 d-none d-md-block">
                <NuxtImg src="/img/mainpage_collage.png" alt="About Steel Master Image" class="w-100"/>
            </div>
        </div>
        <div class="v-flex py-5">
            <div class="d-block d-md-flex pb-5">
                <div class="w-md-50 pe-md-4">
                    <h4>{{ $t('МАТЕРІАЛИ') }}</h4>
                    <p>У роботі використовуємо тільки перевірені і якісні матеріали. Перевірені роками постачальники забезпечують максимально швидке постачання.</p>
                </div>
                <div class="w-md-50 ps-md-4">
                    <h4>{{ $t('ПРОЦЕС') }}</h4>
                    <p>Маємо власне виробництво: від різання і складання, до доставки та монтажу. Ми повністю керуємо всіма процесами, даємо гарантію і особисто відповідаємо за якість своїх робіт.</p>
                </div>
            </div>
            <div class="d-block d-md-flex">
                <div class="w-md-50 pe-md-4">
                    <h4>{{ $t('23 РОКИ НА РИНКУ') }}</h4>
                    <p>Ми створюємо металоконструкції з 2001 р. За цей час ми намагалися зарекомендували себе тільки з хорошого боку і завжди знаходити підхід до клієнта.</p>
                </div>
                <div class="w-md-50 ps-md-4">
                    <h4>{{ $t('500+ ОБ\'ЄКТІВ') }}</h4>
                    <p>Наші вироби з металу радують око не тільки в приватних будинках, а й на літніх майданчики, комерційних підприємствах, виробничих приміщеннях та багатоквартирних будинках.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Our works - photos -->
    <div id="ourworks" class="v-flex container p-5 my-5">
        <!-- <div class="">{{ $t('ДЕЯКІ НАШІ РОБОТИ') }}</div> -->
        <h2 class="">{{ $t('Наші роботи') }}</h2>
        <Collage/>
    </div>

    <!-- Our services -->
    <div id="services" class="vh-height d-center v-center p-5 my-5">
        <div class="v-flex container">
            <div class="p-4">
                <h2>Що ми робимо?</h2>
            </div>
            <div class="v-flex">
                <div class="v-flex d-lg-flex">
                    <div class="w-100 w-lg-50 p-4 d-flex">
                        <div class="pe-4"><NuxtImg src="/img/services/facades.png" layout="intrinsic" /></div>
                        <div class="">
                            <h3>Скляні, вентильовані фасади</h3>
                            Сучасні фасади, вдосконалюють естетичний вигляд і функціональність будь-якої будівлі. 
                            Наші фахівці забезпечують точне проектування, виготовлення та монтаж фасадів, використовуючи високоякісні матеріали та передові технології. 
                            Скляні фасади гарантують максимальне природне освітлення та створюють затишне середовище всередині приміщень, а вентильовані фасади забезпечують ефективну термо- та звукоізоляцію, а також довговічний захист від зовнішніх впливів. 
                            Звертайтесь до нас для створення надійних та привабливих фасадів, які відповідають вашим найвищим вимогам.
                        </div>
                    </div>
                    <div class="w-100 w-lg-50 p-4 d-flex">
                        <div class="pe-4"><NuxtImg src="/img/services/autotents.png" layout="intrinsic"/></div>
                        <div class="">
                            <h3>Автомобільні навіси</h3>
                            Автомобільні навіси забезпечують надійний захист від атмосферних впливів і ультрафіолетового випромінювання, зберігаючи ваш транспортний засіб у належному стані незалежно від погодних умов. 
                            Звертайтеся до нас для виготовлення та встановлення автомобільних навісів, які відзначаються довговічністю, естетичним виглядом та функціональністю.
                        </div>
                    </div>
                </div>
                <div class="v-flex d-lg-flex">
                    <div class="w-100 w-lg-50 p-4 d-flex">
                        <div class="pe-4"><NuxtImg src="/img/services/parkan.png" layout="intrinsic"/></div>
                        <div class="">
                            <h3>Паркани, огорожі</h3>
                            Наші спеціалісти проектують і встановлюють паркани різних видів, які забезпечують надійний захист вашого майна. 
                            Використовуємо тільки високоякісні матеріали, що гарантує довговічність і естетичність огорож. 
                            Звертайтесь до нас для отримання надійного рішення, яке відповідатиме вашим потребам і вподобанням.
                        </div>
                    </div>
                    <div class="w-100 w-lg-50 p-4 d-flex">
                        <div class="pe-4"><NuxtImg src="/img/services/stairs.png" layout="intrinsic"/></div>
                        <div class="">
                            <h3>Сходи</h3>
                            Ми надаємо професійні послуги зі створення сходів для будь-яких приміщень. 
                            Наші фахівці ретельно розробляють проєкт, враховуючи всі вимоги замовника та особливості інтер'єру. 
                            Використовуємо якісні матеріали та новітні технології, щоб забезпечити довговічність, надійність та естетичний вигляд сходів. 
                            Звертайтесь до нас для створення стильних та функціональних сходів, що стануть прикрасою вашого будинку чи офісу.
                        </div>
                    </div>
                </div>
                <div class="v-flex d-lg-flex">
                    <div class="w-100 w-lg-50 p-4 d-flex">
                        <div class="pe-4"><NuxtImg src="/img/services/vorota.png" layout="intrinsic"/></div>
                        <div class="">
                            <h3>Розсувні ворота</h3>
                            Наші фахівці проектують і встановлюють розсувні ворота, що поєднують сучасний дизайн і високу функціональність. 
                            Використовуємо тільки якісні матеріали, що забезпечує надійну роботу воріт протягом тривалого часу. 
                            Розсувні ворота – це ідеальне рішення для оптимізації простору та забезпечення зручного доступу до вашої території. 
                            Звертайтесь до нас для отримання індивідуального рішення, яке відповідатиме вашим потребам.
                        </div>

                    </div>
                    <div class="w-100 w-lg-50 p-4 d-flex">
                        <div class="pe-4"><NuxtImg src="/img/services/doors.png" layout="intrinsic"/></div>
                        <div class="">
                            <h3>Двері, хвіртки</h3>
                            Ми пропонуємо послуги зі створення вхідних дверей та хвірток для вашої безпеки і комфорту. 
                            Наші фахівці розробляють та встановлюють вхідні двері й хвіртки, що поєднують естетику, міцність і надійність. 
                            Використовуємо лише високоякісні матеріали, які забезпечують довговічність і захист вашого будинку або території. 
                            Зверніться до нас для створення індивідуального рішення, що відповідатиме всім вашим потребам і вподобанням.
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Project now -->
    <div class="projecting-block vh-height-50">
        <div class="container py-5 my-5 px-0 px-md-5 w-75">
            <h2>Спроектувати нестандартну металеву конструкцію</h2>
            <p class="">* Надайте швидкий опис необхідної металевої конструкції</p>
            <textarea id="big-text" name="big-text" rows="5" cols="50" class="w-100 mb-3"></textarea><br>
            <!-- <div class=""> -->
                <button class="action-button bold-2">Розрахувати</button>
            <!-- </div> -->
        </div>
    </div>

    <!-- Our technologies -->
    <div id="product" class="technologies-block vh-height d-center v-center container p-5 my-5">
        <div class="v-flex">
            <h2>Технології</h2>
            <Technologies />
        </div>
    </div>

    <!-- Our clients -->
    <div id="clients" class="my-5 p-5 bg-white">
        <div class="container py-5 px-0 px-md-5">
            <h2>Нам довіряють</h2>
            <Carousel />
        </div>
    </div>

    <!-- Work order -->
    <div class="workorder container px-5 my-5 py-4">
        <h2>СПІВПРАЦЯ</h2>
        <WorkOrderBlock/>
    </div>

    <!-- Footer -->
    <div class="footer v-flex justify-content-between align-items-center vh-height-75 bg-dark ">

        <!-- squeeze -->
        <div id="project" class="container d-center my-5">
            <SqueezeBlock/>
        </div>

        <div class="v-flex d-md-flex align-items-center justify-content-between container text-white-75 border-bottom border-grey py-4 text-light">
            <div class="logo py-2">
                <NuxtImg src="/img/logo_sm1_darkmode.png" alt="Steel Master логотип" height="15px"/>
            </div>
            <div class="phone py-2">380-67-777-77-77</div>
            <div class="email py-2">support@steelmetal.com.ua</div>
            <!-- <div class="location">Київ</div> -->
            <!-- <div class=""> -->
            <div class="py-2">
                <button class="text-uppercase f-4 bold-3">ЗАЛИШИТИ ЗАЯВКУ</button>
            </div>
            <!-- </div>             -->
            <Icon class="d-none d-md-block py-2" name="logos:telegram"/>
            <!-- <Icon name="logos:facebook"/> -->
        </div>

        <div class="f-1 text-center container py-4 text-white-50 text-light">
            Все права защищены © 2016-2022 ТОВ "ТБК-1" - виготовлення мтеалоконструкцій на замовлення в Києві<br>
            Разработка и создание сайта - Personal Solutions Ltd.
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

    useHead({
        title: 'Home',
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
    
    import LangSelector from '~/components/langselector.vue'
    import PopupMenu from '~/components/popupmenu.vue'
    import SideMenu from '~/components/sidemenu.vue'
    import MainBlock from '~/blocks/main.vue'
    import Collage from '~/components/collage.vue'
    import Technologies from '~/blocks/main_technologies.vue'
    import Carousel from '~/components/carousel.vue'
    import WorkOrderBlock from '~/blocks/main_workorder.vue'
    import SqueezeBlock from '~/blocks/main_squeeze.vue'
    
    export default {
        components: {
            MainBlock, LangSelector, PopupMenu, SideMenu, Collage, Technologies, Carousel, WorkOrderBlock, SqueezeBlock
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
            console.log('mounted');
            
        },
        unmounted: function() {
            // console.log('unmounted');
        },
        methods: {
        }
    }
</script>

<style lang="scss">
    @import '@/assets/styles/variables';

    .wrapper {
        border-radius: $wrapper-radius;
        margin: $wrapper-spacing;
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
        border-radius: $blocks-radius $blocks-radius $wrapper-radius $wrapper-radius;
    }
    
</style>
