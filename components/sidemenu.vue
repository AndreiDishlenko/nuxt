<template lang="">
    
    <div ref="menu" :class="[
            'side-menu',
            'p-5',
            isOpened ? 'isOpened' : ''
        ]"
        @click="isMenuClick=true"
        >
        <div class="close-button"><Icon name="material-symbols-light:close-small" @click="this.close()"/></div>

        <div class="menu-container v-flex text-white">
            <div v-for="item in content" class="p-3">
                <a class="dark" :href="item.href" @click="close()">{{ $t(item.text) }}</a>
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
                isOpened: false,
                isMenuClick: false
            }
        },
        mounted: function() {
            window.addEventListener('click', this.handleClickOutside, true);
        },
        onBeforeUnmount: function() {
            window.removeEventListener('click', this.handleClickOutside);
        },

        methods: {
            handleClickOutside: function(event) {
                if (!this.$refs.menu.contains(event.target)) 
                    this.close();
            },
            switch: function() {
                // console.log('sidemenu.trigger', this.isOpened);
                this.isOpened = !this.isOpened;
            },
            close: function() {
                this.isOpened = false;
            }
        }
    }
</script>

<style lang="scss">
    .side-menu {
        position: fixed;        
        height: 100dvh;
        z-index: 100;
        background: $dark-popup-background;

        width: 70dvw;
        right: -70dvw;
        transition: right 0.5s ease 0s;
        border-radius: 10px 0px 0px 10px;

        @media (min-width: 576px) {
            width: 50dvw;
            right: -50dvw;
        }

        @media (min-width: 768px) {
            width: 40dvw;
            right: -40dvw;           
        }

        .close-button {
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
            color: #666666;
            cursor: pointer;
        }
    }

    .isOpened {
        right: 0;
        transition: right 0.5s ease 0s;
    }
</style>