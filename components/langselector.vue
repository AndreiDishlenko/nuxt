<template lang="">

	<div class="lang-selector dropdown">

		<button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<!-- <span class="lang"> -->
                <Icon v-if="language=='uk'" name="emojione:flag-for-ukraine"/>
                <Icon v-if="language=='ru'" name="emojione:flag-for-russia"/>
            <!-- </span> -->
			<!-- <span class="flex-grow-1 me-2">{{ language.toUpperCase() }}</span> -->
		</button>

		<div class="dropdown-menu text-2">
			<div class="dropdown-item" @click="setLang('uk')">
                <Icon name="emojione:flag-for-ukraine"/>
				<span class="flex-grow-1">Українська</span>
			</div>
			<div class="dropdown-item" @click="setLang('ru')">
				<Icon name="emojione:flag-for-russia"/>
				<span class="flex-grow-1">Російська</span>
			</div>
		</div>

	</div>

</template>

<script>
	export default {
		data: function() {
            return {
                language: '',
                langs: ['uk', 'ru'],
            }
        },
		async mounted() {
            let result = localStorage.getItem('language');
            console.log(result);
            
            if (!result || !this.langs.includes(result))
                result = 'uk';

            this.language = result;
        },
		methods: {			
			setLang: function(lang) {
                if (!lang || !this.langs.includes(lang))
                    return;

                this.language = lang;
				localStorage.setItem('language', lang);
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