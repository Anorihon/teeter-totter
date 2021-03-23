<template>
    <Game/>
</template>

<script>
    import Game from "./components/Game";

    export default {
        name: 'App',
        components: {Game}
    }
</script>

<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-size: 16px;
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
        height: 100%;
    }
</style>
