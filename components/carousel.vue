<template>
    <swiper 
        :navigation="true" 
        :modules="modules" 
        class="px-4"
        :loop="true"
        :slidesPerView="3"
        :height="300"
    >

        <SwiperSlide v-for="slide in slides">
            <NuxtImg :src="slide"/>
        </SwiperSlide>

    </swiper>
  </template>

  <script>
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';  
    import 'swiper/css/navigation';

    // import required modules
    import { Navigation } from 'swiper/modules';
  
    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            return {
                modules: [Navigation],
            };
        },
        data: function() {
            return {
                slides: [
                    '/img/clients/f_kvartal.png',
                    '/img/clients/slavutich.png',
                    '/img/clients/slavutich2.png',
                    '/img/clients/start.png',
                    '/img/clients/zarechniy.png'
                ],
				isMenuVisible : false
            }
        },
    };
  </script>

<style>
    .swiper {
        width: 100%;
        height: 100%;
        user-select: none; 
    }

    .swiper-wrapper {
        align-items: center;
        height: 200px;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            display: block;
            height: 50%;
            object-fit: cover;
            border-radius: 15px;
            transition: transform 300ms ease-out;
        }
    }

    .swiper-slide-next {
        img {
            transform: translate(0px, 0px) scale(1.3, 1.3);
        }
    } 

</style>
  