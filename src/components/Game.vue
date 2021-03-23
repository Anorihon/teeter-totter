<template>
    <div class="game">
        <Controls/>
        <TeeterTotter/>
    </div>
</template>

<script>
    import TeeterTotter from "./TeeterTotter";
    import Controls from "./Controls";
    import {useStore} from 'vuex';
    import {computed, watch} from "vue";

    export default {
        name: "Game",
        components: {Controls, TeeterTotter},

        setup() {
            const store = useStore();
            const isEnded = computed(() => store.state.isEnded);

            watch(isEnded, isEnded => {
                if(isEnded === true){
                    alert(`Game Over!\nPress "Reset" button for play again`);
                }
            });

            return {isEnded};
        }
    }
</script>

<style lang="scss" scoped>
    .game {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>