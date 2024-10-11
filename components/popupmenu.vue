<template lang="">

<div :class="['popup-menu', 'apple-shadow', isMenuVisible ? '' : 'collapsed']">
        <div class="top-line">
            <div class="d-flex justify-content-between container">
                <div class="flex-grow-1 bold-1 ">
                    <Icon name="ri:telegram-2-line" size="1em" class="me-1"/>Київ
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
                <!-- Body -->
                <div class="w-50 d-flex flex-grow-1 justify-content-between text-uppercase bold-1 text-black">
                    <a v-for="item in content" :href="item.href">{{ $t(item.text) }}</a>
                </div>

                <div class="w-25 d-none d-md-block text-end">
                    <button class="text-uppercase f-4 bold-3">Залишити заявку</button>
                </div> 
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            content: {
				type: Object,
				required: false,
				default: {},
				// validator(value) {
				// 	return ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
				// }
			}
        },
        data: function() {
            return {
				isMenuVisible : false,
            }
        },
        mounted: function() {
            window.addEventListener('scroll', this.handleScroll);
            this.handleScroll();
        },
        unmounted: function() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll: function() {
                this.isMenuVisible = window.scrollY > 200;
            },
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

</style>