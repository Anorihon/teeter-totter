<template>
    <nav class="controls teal lighten-3">
        <div class="nav-wrapper">
            <div class="buttons center">
                <div
                        class="waves-effect waves-light btn"
                        v-show="!isInProgress"
                        @click.stop.prevent="handle_start">Start
                </div>
                <div
                        class="waves-effect waves-light btn"
                        :class="{disabled: !isInProgress}"
                        v-show="!isEnded"
                        @click.stop.prevent="handle_pause_resume">{{isOnPause ? 'Resume' : 'Pause'}}
                </div>
                <div
                        class="waves-effect waves-light btn"
                        v-show="isInProgress"
                        @click.stop.prevent="handle_reset">Reset
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import {useStore} from 'vuex';
    import {computed} from "vue";

    export default {
        name: "Controls",

        setup() {
            const store = useStore();

            const isInProgress = computed(() => store.state.isInProgress);
            const isOnPause = computed(() => store.state.isOnPause);
            const isEnded = computed(() => store.state.isEnded);

            const handle_start = () => {
                store.commit('toggleProgress', true);
                store.dispatch('addShapeLeft');
            };

            const handle_reset = () => {
                store.dispatch('resetShapes');
                store.dispatch('resetBalance');
            };

            const handle_pause_resume = () => {
                store.commit('togglePause');
            };

            return {
                isInProgress, isOnPause, isEnded, handle_start, handle_reset, handle_pause_resume
            };
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        margin: 0 10px;
    }
</style>