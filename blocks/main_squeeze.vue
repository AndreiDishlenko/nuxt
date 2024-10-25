<template lang="">

    <div class="squeeze d-flex bg-light">
        <div v-if="stage==0" class="w-50 d-none d-md-block leftpart"></div>
        <div class="w-100 rightpart v-flex justify-content-between p-5" :class="[
            stage>0 ? 'w-100' : '',
        ]">
            <h3 v-if="stage<4" class="mb-3">{{ $t('УТОЧНИМО ДЕТАЛІ ПРОЄКТУ?')}}</h3>
            <p v-if="stage==0" class="h-100">{{ $t('Дайте відповідь на кілька запитань, і отримайте консультацію та розрахунок вартості  того ж дня.')}}</p>

            <!-- Select object -->
            <div v-if="stage==1" class="squeeze-options v-flex pb-4">
                <div class="pb-4">{{ $t('Ваш об\'єкт:') }}</div>
                <div v-for="object in objects" class="form-group">
                    <div class="form-check">
                        <label class="form-check-label" for="flexCheckDefault">{{ $t(object.name) }}</label>
                        <input class="form-check-input" type="checkbox" v-model="object.value" >                    
                    </div>
                </div>        
            </div>

            <!-- Select product -->
            <div v-if="stage==2" class="squeeze-options v-flex pb-4">
                <div class="pb-2">{{ $t('Який виріб потрібно:') }}</div>
                <div v-for="(product, index) in products" class="form-group">
                    <div class="form-check">
                        <label class="form-check-label" for="flexCheckDefault">{{ $t(product.name) }}</label>
                        <input class="form-check-input" type="checkbox" v-model="product.value" >                    
                    </div>
                </div>           
            </div>

            <!-- Contacts -->
            <div v-if="stage==3" class="squeeze-options v-flex ">
                <Form @submit="onSubmit" class="v-flex justify-content-between h-100">
                    <div class="form-group mb-4">
                        <label for="username" class="form-label">Ваше ім'я:</label>
                        <Field ref="autofocuselement" type="text" name="username" v-model="name" class="form-control" :rules="validateName"/>
                        <ErrorMessage class="form-error" name="username" />
                    </div>
                    <div class="form-group mb-4">
                        <label for="phone" class="form-label">Телефон для зв'язку:</label>
                        <Field type="text" name="phone" v-model="phone" class="form-control" :rules="validatePhone"
                            mask="'(0##) ###-##-##'"
                            masked="false"
                            v-mask="'(0##) ###-##-##'"
                            placeholder="(0xx) xxx-xx-xx"
                        />
                        <ErrorMessage class="form-error" name="phone" />
                    </div>

                    <div  class="flex-grow-1"></div>

                    <button type="submit" class="float-end px-5">{{ $t('Далі..')}}</button>
                </Form>
                <div class="flex-grow-1"></div>            
            </div>

            <!-- Finish message -->
            <div v-if="stage==4" class="squeeze-options v-flex justify-content-center align-items-center h-100">
                {{ $t('Запит відправлено') }}
            </div>

            <div v-if="stage<3" class="flex-grow-1"></div> 

            <div v-if="stage<3" class="">
                <button class="float-end px-5" @click="nextStage">{{ $t('Далі..')}}</button>
            </div>
        </div>
        
        <!-- <div v-if="stage>0 && stage<3" class="w-50 v-flex h-100 p-5">
            <div class="flex-grow-1"></div> 

            <div class="">
                <button class="float-end px-5" @click="nextStage">{{ $t('Далі..')}}</button>
            </div>
        </div> -->

    </div>

</template>

<script>
    import { Form, Field, ErrorMessage, useField, useForm } from 'vee-validate';

    export default {
        components: { Form, Field, ErrorMessage },
        setup() {
            const { handleSubmit } = useForm();

            // Определение правил валидации
            const emailRules = yup.string().email('Неверный email').required('Email обязателен');

            // Ссылка на поле
            const emailRef = ref(null);

            // Обработка отправки формы
            const submitForm = handleSubmit((values) => {
                console.log(values);
                console.log('Доступ к полю через ref:', emailRef.value); // Доступ через ref
            });

            return {
                emailRef,
                emailRules,
                submitForm,
            };
        },
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
                // selected_obects: [false, false, false, false, false],
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
                nameField: null
            }
        },
        mounted() {
            // if (process.client) {
            //     const element = ref(null);

                // const observer = new IntersectionObserver((entries) => {
                //     if (entries[0].isIntersecting) {
                //         console.log("Элемент показан на экране");
                //     }
                // });

                // observer.observe(this.$refs.element);
            // }
        },
        methods: {			
            nextStage: async function() {  
                             
                if (this.stage==3) {
                }

                this.stage++;

                if (this.stage==3) 
                    this.$nextTick(() => {
                        this.$refs.autofocuselement.focus();
                    });

                console.log(this.$refs)
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

                const response = await fetch(process.env.url+'/api/userform', {
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
            },
            validateName: function(value) {
                console.log('validatename');

                if (!value) 
                    return '* Обов\'язково до заповнення';
                
                return true;
            },
            validatePhone: function(value) {               
                console.log('validate phone');

                if (!value) 
                    return '* Обов\'язково до заповнення';
                
                const regex = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
                if (!regex.test(value)) {
                    return '* Не коректний номер телефону';
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
            border-radius: 1.5rem 0rem 0rem 1.5rem;
        }

        .test {
            position: absolute;
        }
    }
</style>