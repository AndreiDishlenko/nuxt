<template>
       
    <!-- aria-hidden="true" -->
    <div id="staticBackdrop" class="modal fade" data-bs-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel"> 
        
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-4">
                <div class="modal-body">

                    <button type="submit" class="btn btn-primary-outline closebutton" data-bs-dismiss="modal">x</button>

                    <Form @submit="onSubmit" v-if="is_askmode">
                        <div class="form-group mb-4">
                            <label for="username" class="form-label">Ваше ім'я:</label>
                            <input ref="autofocuselement" type="text" name="username" v-model="name" class="form-control" :rules="validateName"/>
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
                        <div class="form-group mb-4">
                            <label for="description" class="form-label">Cтисло опишіть задачу:</label>
                            <textarea v-model="description" class="form-control"/>
                            <ErrorMessage class="form-error" name="description" />
                        </div>

                        <button type="submit" class="btn btn-primary">Відправити</button>
                    </Form>

                    <Form v-if="!is_askmode">
                        Заявку надіслано.<br>
                        Ми зв'яжемось з Вами найближчим часом.<br><br>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Закрити</button>
                    </Form>

                </div>
            </div>
        </div>
    </div>

</template>
  
<script setup>
</script>

<script>
    import { Form, Field, ErrorMessage } from 'vee-validate';

    export default {
        components: { Form, Field, ErrorMessage },
        // directives: {
        //     email: {
        //         mounted: (el) => {
        //             el.addEventListener('input', (event) => {
        //                 let value = event.target.value;
        //                 value = value.replace(/[^a-zA-Z0-9@._-]/g, '');
        //                 event.target.value = value;
        //             });
        //         }
        //     }
        // },
        data: function() {
            return {
                is_askmode: true,
                name: '',
                phone: '',
                description: '',
                showModal: true,
            }
        },
        mounted() {
            var myModal = document.getElementById('staticBackdrop');
            var $this = this;
            console.log('rr', this.$refs);
            
            myModal.addEventListener('show.bs.modal', function () {
                $this.phone='';
                $this.description='';
            });
            myModal.addEventListener('shown.bs.modal', function () {
                $this.$refs.autofocuselement.focus();  
            });
        },
        methods: {
            onSubmit: async function() {
                const response = await fetch(process.env.url+'/api/userform', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.name,
                        phone: this.phone,
                        description: this.description
                    })
                });
                
                if (response.ok)
                    this.is_askmode = false;

                return false;
            },
            validateName: function(value) {
                if (!value) 
                    return '* Обов\'язково до заповнення';
                
                return true;
            },
            validatePhone: function(value) {               
                if (!value) 
                    return '* Обов\'язково до заповнення';
                
                const regex = /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
                if (!regex.test(value)) {
                    return '* Не коректний номер телефону';
                }
                
                return true;
            },
            validateEmail: function(value) {
                if (!value) 
                    return '* Обов\'язково до заповнення';
                
                const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                if (!regex.test(value)) {
                    return '* Не коректний e-mail';
                }
                
                return true;
            },
        }
    }
</script>

<style lang="scss">
    .modal {
        background: rgba(0, 0, 0, 0.5);
        color: variables.$main-text!important;
    }
    .closebutton {
        position: absolute;
        right: -10px;
        top: -10px;
    }
</style>
  