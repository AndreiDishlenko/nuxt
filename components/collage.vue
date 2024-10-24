<template lang="">
    <div class="collage v-flex">
        <div class="divider"></div>
        <div class="photos collage-container w-100">
            <div class="text-2xl flex flex-col gap-y-4 items-center justify-center h-full w-100 pb-8">
                <h2 class="">{{ $t('Приклади робіт') }}</h2>
                <p>{{ $t('Ми пишаємося кожним виконаним проєктом і завжди орієнтуємось на результат, який перевершує очікування наших клієнтів.')}}</p>
                <p>{{ $t('Кожна деталь, кожний аспект роботи – це свідчення нашого прагнення до досконалості.')}}</p>
            </div>
            <ul class="grid grid-cols-1 gap-3 lg:block">
                <li class="position-relative group collage-item">
                    <img width="527" height="430" src="/img/ourworks/sample_1.png" class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover">
                </li>
                <li class="position-relative group collage-item">
                    <img width="527" height="430" src="/img/ourworks/sample_2.png" class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover">
                </li>
                <li class="position-relative group collage-item">
                    <img width="527" height="430" src="/img/ourworks/sample_3.png" class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover">
                </li>
                <li class="position-relative group collage-item">
                    <img width="527" height="430" src="/img/ourworks/sample_4.png" class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover">
                </li>
                <li class="position-relative group collage-item">
                    <img width="527" height="430" src="/img/ourworks/sample_5.jpg" class="h-auto max-h-[430px] rounded-md transition-all duration-200 border-image brightness-80 hover:brightness-100 will-change-[filter] object-cover">
                </li>
            </ul>

            <!-- <div class="grid-item"><NuxtImg src="/img/ourworks/image 6.png" alt=""/></div>
            <div class="grid-item"><NuxtImg src="/img/ourworks/image 7.png" alt=""/></div>
            <div class="grid-item"><NuxtImg src="/img/ourworks/image 8.png" alt=""/></div>
            <div class="grid-item"><NuxtImg src="/img/ourworks/image 10.png" alt=""/></div> -->
        </div>
        <div class="divider"></div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">

    .collage-container {
        ul {
            padding-left: 0px;
            list-style-type: none;
        }
        .grid {
            display: grid;
        }
        .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        img {
            transition-duration: .7s;
            cursor: pointer;
            display: block; 
            margin-left: auto; 
            margin-right: auto;
            width: 100%;
            @media screen and (min-width: 576px) {
                width: 75%!important;
            }
        }
        img:hover {
            transform: scale(1.1); /* Увеличение изображения на 20% при наведении */
            // opacity: 0.7;
            // filter: brightness(60%) contrast(100%) saturate(0%) blur(0px) hue-rotate(0deg);
            transition-duration: .7s;
            // transition-property: transform;
        }
    

        @media screen and (min-width: 768px) {
            -moz-column-count: 2;
            column-count: 2;
            -moz-column-fill: balance;
            column-fill: balance;
            -moz-column-gap: 1.5rem;
            column-gap: 1.5rem;
            // margin: 20px auto 0;
            // padding: 2rem;

            img {
                width: 100%!important;
            }
        }

        @media screen and (min-width: 1024px) {
            -moz-column-count: 3;
            column-count: 3;

            .collage-item, .upload {
                display: inline-block;
                // margin: 0 0 20px;
                page-break-inside: avoid;
                -moz-column-break-inside: avoid;
                break-inside: avoid;
                width: 100%;
            }
        }

        .collage-item {
            // img ----------------
            @media (min-width: 768px) {
                .border-image {
                    border-color: #ffffff1a;
                    border-width: 1.15px;
                }
            }

            .will-change-\[filter\] {
                will-change: filter;
            }

            .brightness-80 {
                --tw-brightness: brightness(.8);
            }
            .brightness-100 {
                --tw-brightness: brightness(1);
            }
            .brightness-\[\.2\], .brightness-\[\.8\] {
                filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
            }
            .object-cover {
                object-fit: cover;
            }
            .rounded-md {
                border-radius: .375rem;
            }
            .w-full {
                width: 100%;
            }
            .max-h-\[430px\] {
                max-height: 430px;
            }
            .h-auto {
                height: auto;
            }
            img, video {
                height: auto;
                max-width: 100%;
            }
            audio, canvas, embed, iframe, img, object, svg, video {
                display: block;
                vertical-align: middle;
            }
        }

        
    }

</style>