<template>
    <div class="modal">
        <div class="modal__close"
             @click="$emit('closeModal')">x
        </div>
        <div class="modal__content">
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, .3);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal__content {
        width: 500px;
        padding: 30px;
        box-sizing: border-box;
        background-color: #fff;
    }

    .modal__close {
        position: absolute;
        top: 30px;
        right: 30px;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
    }
</style>
