<template lang="">

    <div class="main-block container py-5">

        <!-- Header -->
        <div class="header p-0">
            <div class="d-flex w-75">
                <div class="logo"><NuxtImg src="/img/logo_sm1_darkmode.png" alt="Steel Master логотип"/></div>
                <div class="items d-none d-lg-flex justify-content-around w-100">
                    <a v-for="item in header" :href="item.href" class="f-2">{{ $t(item.text) }}</a>
                </div>
            </div>


            <div class="location d-flex align-items-center justify-content-end text-end flex-grow-1">
                    <Icon name="ri:telegram-2-line" size="1rem" class="pe-4" style="color: yellow;" />
                    <div class="ps-2 me-3 bold-1 ">Київ</div>
                    <LangSelector class="pe-3"/>
                    <!-- <div class="d-md-none"> -->
                    <Icon name="stash:burger-classic" class="burger-button d-lg-none" @click="$refs.sidemenu.switch()"/>
                    <!-- </div> -->
                    
            </div>                

        </div>

        <!-- Benefits -->
        <div class="v-flex d-sm-flex benefits f1 w-100 w-lg-75 w-xl-50">
            <div class="thin-1">Від 2 тижднів<div class="separator mt-2"></div></div>
            <div class="thin-1">Від 5000 грн<div class="separator mt-2"></div></div>
            <div class="thin-1">Гарантія від 5 років<div class="separator mt-2"></div></div>
            <div class="thin-1">По договору<div class="separator mt-2"></div></div>
        </div>

        <!-- Key slogan -->
        <div class="slogan">
            <div class="">
                <h1>ВИГОТОВИМ БУДЬ-ЯКУ КОНСТРУКЦІЮ З МЕТАЛУ</h1>
            </div>
            <div class="f1">Для  приватних будинків, котеджних містечок, комерційних підприємств</div>
        </div>

        <!-- Action button -->
        <button class="action-button big-button mb-4 bold-2">ОТРИМАТИ БЕЗКОШТОВНУ КОНСУЛЬТАЦІЮ</button>

    </div>

</template>

<script>
    import LangSelector from '~/components/langselector.vue'

    export default {
        components: {
            LangSelector
        },
        props: {
            header: {
				type: Object,
				required: false,
				default: {},
			}
        },
    }
</script>

<style lang="scss">

    .main-block {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom-left-radius: variables.$blocks-radius;   
        border-bottom-right-radius: variables.$blocks-radius;

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
                width:30%
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

            .burger-button {
                cursor: pointer;
            }
        }

        .benefits {
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

</style>