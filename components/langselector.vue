<template lang="">

	<div class="lang-selector dropdown">

        <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <Icon v-if="locale=='uk'" name="emojione:flag-for-ukraine"/>
            <Icon v-if="locale=='ru'" name="emojione:flag-for-russia"/>
		</button>

		<div class="dropdown-menu text-2">
			<div v-for="item in locales" class="dropdown-item" @click="this.setLang(item.code)">
                <Icon :name="item.icon"/>
				<span class="flex-grow-1">{{ item.name }}</span>                
			</div>
		</div>

        <!-- <div class="text-white">
            <NuxtLink :to="switchLocalePath('uk')" class="text-white">uk</NuxtLink> | 
            <NuxtLink :to="switchLocalePath('ru')" class="text-white">ru</NuxtLink>
        </div> -->

	</div>

</template>


<script>
    import { ref } from 'vue'

	export default {
        data: function() {
            return {
                locales: this.$i18n.locales,
                locale: this.$i18n.locale,
            }
        },
		async mounted() {
            let result = localStorage.getItem('locale');
            if (!result || !Object.values(this.locales).map(item => item.code).includes(result))
                result;

            this.$i18n.setLocale(result);        
        },
		methods: {			
            getDefaultLanguage: function() {
                // console.log('getDefaultLanguage');                
                let result = localStorage.getItem('locale');

                if (!result || !this.locales.includes(result))
                    result = 'uk';

                this.locale = result;
            },
			setLang: function(selected_locale) {
                if (!selected_locale || !Object.values(this.locales).map(item => item.code).includes(selected_locale))
                    return;

				localStorage.setItem('locale', selected_locale);
                this.$i18n.setLocale(selected_locale)
			}
        },
	}
</script>

<style>
	.lang-selector {

		.dropdown-toggle {
			display:flex;
			align-items: center;
			flex-grow: 1;
		}
		.dropdown-menu {
			--bs-dropdown-font-size: 0.875rem;
			min-width: 0px;
		}
        .dropdown-toggle::after {
            color: #cccccc!important;
            display: none;
        }
		.dropdown-item {
			/* color: inherit; */
			line-height: 3;
			white-space: nowrap;
			cursor:pointer;
		}

		img {
			content: '';
			width: 24px;
			height: 24px;
			margin-right:10px;
			border-radius: 50%;
		}

		button>span {
			font-size: var(--size-2);
		}

        .btn {
            border:0px;
        }
	}
</style>