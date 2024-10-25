<template lang="">

    <div class="squeeze d-flex bg-light">
        <div v-if="stage==0" class="w-50 d-none d-md-block leftpart"></div>
        <div class="w-100 rightpart v-flex justify-content-between p-5" :class="[
            stage==0 ? 'w-lg-50' : '',
        ]">
            <h3 v-if="stage<4" class="mb-3">{{ $t('УТОЧНИМО ДЕТАЛІ ПРОЄКТУ?')}}</h3>
            <p v-if="stage==0" class="h-100">{{ $t('Дайте відповідь на кілька запитань, і отримайте консультацію та розрахунок вартості  того ж дня.')}}</p>

            <!-- Select object -->
            <div v-if="stage==1" class="squeeze-options v-flex pb-2">
                <div class="pt-2 pb-3">{{ $t('Ваш об\'єкт:') }}</div>
                <div v-for="object in objects" class="form-group">
                    <div class="form-check">
                        <label class="form-check-label" for="flexCheckDefault">{{ $t(object.name) }}</label>
                        <input class="form-check-input" type="checkbox" v-model="object.value" >                    
                    </div>
                </div>        
            </div>

            <!-- Select product -->
            <div v-if="stage==2" class="squeeze-options v-flex pb-2">
                <div class="pt-2 pb-3">{{ $t('Оберіть виріб, який вам потрібно:') }}</div>
                <div v-for="(product, index) in products" class="form-group">
                    <div class="form-check">
                        <label class="form-check-label" for="flexCheckDefault">{{ $t(product.name) }}</label>
                        <input class="form-check-input" type="checkbox" v-model="product.value" >                    
                    </div>
                </div>           
            </div>

            <!-- Contacts -->
            <div class="squeeze-options v-flex ">
                <Form v-if="stage==3" @submit="onSubmit" class="v-flex justify-content-between h-100">

                    <div class="flex-grow-1 v-flex v-center mb-3">
                        <div class="form-group mb-4 w-100">
                            <label for="username" class="form-label">Ваше ім'я:</label>
                            <Field ref="usernameRef" type="text" name="username" v-model="name" class="form-control" :rules="validateName"/>
                            <ErrorMessage class="form-error" name="username" />
                        </div>
                        <div class="form-group mb-4 w-100">
                            <label for="phone" class="form-label">Телефон для зв'язку:</label>
                            <Field type="text" name="phone" v-model="phone" class="form-control" :rules="validatePhone"
                                mask="'(0##) ###-##-##'"
                                masked="false"
                                v-mask="'(0##) ###-##-##'"
                                placeholder="(0xx) xxx-xx-xx"
                            />
                            <ErrorMessage class="form-error" name="phone" />
                        </div>
                    </div>

                    <div class="text-center pt-1">
                        <button type="submit" class="px-5">{{ $t('Надіслати')}}</button>
                    </div>
                    
                </Form>
                <div class="flex-grow-1"></div>            
            </div>

            <!-- Finish message -->
            <div v-if="stage==4" class="squeeze-options v-flex justify-content-center align-items-center h-100">
                <div class="d-flex">
                    <Icon name="emojione-v1:white-heavy-check-mark" class="mx-3" size="3rem"/>
                    <div class="">
                        {{ $t('Заявку надіслано.')}}<br>
                        {{ $t('Ми зв\'яжемось з Вами найближчим часом.')}}
                    </div>
                </div>

            </div>

            <div v-if="stage<3" class="flex-grow-1"></div> 

            <div v-if="stage<3" class="d-flex">
                <div class="form-error w-100">{{ formerror }}</div>
                <div class="">
                    <button class="float-end px-5" @click="nextStage">{{ $t('Далі..')}}</button>
                </div>
                
            </div>
        </div>

    </div>

</template>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';
    import { ref } from 'vue';
    export default {
        components: { Form, Field, ErrorMessage },
        data: function() {
            return {
                stage: 0,
                objects: [
                    {name:'Приватний будинок', value:false},
                    {name:'Житловий комплекс', value:false},
                    {name:'Промисловий об\'єкт', value:false},
                    {name:'Торгівельні приміщення', value:false},
                    {name:'Інше', value:false}
                ],
                products: [
                    {name:'Фасад', value:false},
                    {name:'Навіс', value:false},
                    {name:'Огорожа', value:false},
                    {name:'Сходи', value:false},
                    {name:'Ворота', value:false},
                    {name:'Хвіртка', value:false},
                ],
                name: '',
                phone: '',
                formerror: ''
            }
        },
        mounted() {
        },
        methods: {			
            nextStage: async function() {  
                if (this.stage==1 && !this.validateObjects()) 
                    return false;

                if (this.stage==2 && !this.validateProducts()) 
                    return false;

                this.stage++;

                if (this.stage==3) 
                    this.$nextTick(() => {
                        this.$refs.usernameRef.$el.focus();
                    });

            },
            onSubmit: async function() {
                let description = '';
                this.objects.forEach(object => {
                    if (object.value)
                        description = description + object.name + ', ';
                });

                description = description + '\nВироби: '
                this.products.forEach(product => {
                    if (product.value)
                        description = description + product.name + ', ';
                });

                const response = await fetch(useRuntimeConfig().public.apiUrl+'/api/userform', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.name,
                        phone: this.phone,
                        description: description
                    })
                });

                if (response.ok)
                    this.stage++;
                return true;
            },

            validateObjects: function() {
                let result = false;
                this.objects.forEach(t => {
                    if (t.value)
                        result = true;
                });

                if ( !result ) {
                    this.formerror = this.$t('* Оберіть ваш об\'єкт');
                    return false;
                }

                this.formerror = '';
                return true;
            },
            validateProducts: function() {
                let result = false;
                this.products.forEach(t => {
                    if (t.value)
                        result = true;
                });

                if ( !result ) {
                    this.formerror = this.$t('* Оберіть виріб, який вам потрібно');
                    return false;
                }
                
                this.formerror = '';
                return true;
            },

            validateName: function(value) {
                console.log('validatename');

                if (!value) 
                    return this.$t('* Обов\'язково до заповнення');
                
                return true;
            },
            validatePhone: function(value) {               
                console.log('validate phone');

                if (!value) 
                    return this.$t('* Обов\'язково до заповнення');
                
                const regex = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
                if (!regex.test(value)) {
                    return this.$t('* Не коректний номер телефону');
                }
                
                return true;
            },
        }
    }
</script>

<style lang="scss">
    .squeeze {
        border-radius: 1.5rem;
        background-color: white;
        width:100%;
        min-height: 400px;
        .leftpart {
            background-image: url('/img/squeeze_background.png'); 
            background-size: cover;
            border-radius: 1.5rem 0rem 0rem 1.5rem;
        }

        .test {
            position: absolute;
        }
    }
</style>