<template>
    <div id="app" class="app">
        <playing-field></playing-field>
    </div>
</template>

<script>
    import PlayingField from './components/PlayingField';

    export default {
        components: {
            PlayingField,
        }
    }
</script>

<style>
    @import './assets/css/reset.css';

    .app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        background-color: #436e8e;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
