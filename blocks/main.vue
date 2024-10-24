<template lang="">

    <SideMenu ref="sidemenu" :content="header"/>
    <ModalFeedback ref="modal_feedback"/>

    <div class="main-block w-100">

        <div class="container w-100 h-100 d-flex flex-column justify-content-between align-items-start px-4 py-5">
            <!-- Header -->
            <div class="header w-100 p-0">
                <div class="d-flex w-75 align-items-center">
                    <div class="logo">
                        <NuxtImg src="/img/logo_sm1_darkmode.png" alt="ТБК1 логотип" height="20px"/>
                    </div>
                    <div class="items d-none d-lg-flex justify-content-around w-100">
                        <a v-for="item in header" :href="item.href" class="f-2">{{ $t(item.text) }}</a>
                    </div>
                </div>

                <div class="end-header d-flex align-items-center justify-content-end text-end flex-grow-1">
                    <Icon name="ri:telegram-2-line" size="1rem" class="pe-4" style="color: yellow;" />
                    <div class="ps-2 me-3 bold-1 ">Київ</div>
                    <LangSelector class="pe-3"/>
                    <Icon name="stash:burger-classic" class="burger-button d-lg-none" @click="$refs.sidemenu.open()"/>
                </div>                
            </div>

            <!-- Benefits -->
            <div class="v-flex d-sm-flex benefits f1 w-100 w-lg-75 w-xl-50">
                <div class="thin-1">{{ $t('Від 1 тижня') }}<div class="separator mt-2"></div></div>
                <div class="thin-1">{{ $t('Від 5000 грн') }}<div class="separator mt-2"></div></div>
                <div class="thin-1">{{ $t('Гарантія від 5 років') }}<div class="separator mt-2"></div></div>
                <div class="thin-1">{{ $t('За договором') }}<div class="separator mt-2"></div></div>
            </div>

            <!-- Key slogan -->
            <div class="slogan w-100">
                <div class="">
                    <h1>{{ $t('ВИГОТОВИМ БУДЬ-ЯКУ КОНСТРУКЦІЮ З МЕТАЛУ')}}</h1>
                </div>
                <div class="f1">{{ $t('Для приватних будинків, котеджних містечок, комерційних підприємств')}}</div>
            </div>

            <!-- Action button -->
            <button class="action-button big-button f1 bold-3 mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">{{ $t('Отримати консультацію')}}</button>
        </div>

    </div>

</template>

<script>
    import LangSelector from '~/components/langselector.vue'
    import SideMenu from '~/components/sidemenu.vue'
    import ModalFeedback from '~/components/modal_feedback.vue'

    export default {
        components: {
            LangSelector, SideMenu, ModalFeedback
        },
        props: {
            header: {
				type: Object,
				required: false,
				default: {},
			}
        },
        methods: {
            sendTelegramNotification: async function(phone) {
                const response = await fetch('https://api.telegram.org/bot7736147378:AAHajsSsiWUjCPvudsyBY1FCou4bvDhsFbs/sendMessage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: 520701986,
                        text: `Заказ звонка на номер: ${phone}`
                    })
                });

                console.log('tm answer', response.json);                
                return response.json;
            }
        }
    }
</script>

<style lang="scss">

    .main-block {
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
            .end-header {
                // width: 25%;
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

        // .action-button {
        //     max-width:25rem;
        // }

    }

</style>