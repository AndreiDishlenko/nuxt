<template lang="">

    <div class="squeeze d-flex bg-light">
        <div class="w-50 leftpart"></div>
        <div class="w-50 rightpart v-flex justify-content-between p-5">
            <h3 class="mb-4">УТОЧНИМО ДЕТАЛІ ПРОЄКТУ?</h3>
            <p class="h-100">Дайте відповідь на кілька запитань, і отримайте консультацію та розрахунок вартості  того ж дня.</p>
            <div class="">
                <button class="w-50" style="float:right;">Далі..</button>
            </div>
            
        </div>
    </div>

</template>

<script>
    export default {
        
    }
</script>

<style lang="scss">
    .squeeze {
        border-radius: 1.5rem;
        background-color: white;
        width:100%;
        height: 400px;
        .leftpart {
            background-image: url('/img/squeeze_background.png'); 
            border-radius: 1.5rem 0rem 0rem 1.5rem;
        }
    }
</style>