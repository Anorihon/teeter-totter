<template>
    <div class="teeter-totter">
        <div class="teeter-totter__platform"></div>
        <div class="teeter-totter__panel" :style="rotateStyle"></div>
        <div class="teeter-totter__shapes" :style="rotateStyle">
            <div class="side side__left">
                <Shape
                        v-for="shape in shapesLeft" :key="shape"
                        :type="shape.type"
                        :weight="shape.weight"
                        :color="shape.color"
                        :init-column="shape.column"
                        :is-static="false"
                />
            </div>
            <div class="side side__right">
                <Shape
                        v-for="shape in shapesRight" :key="shape"
                        :type="shape.type"
                        :weight="shape.weight"
                        :color="shape.color"
                        :init-column="shape.column"
                        :is-static="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import Shape from "./Shape";
    import {useStore} from 'vuex';
    import {computed} from 'vue';

    export default {
        name: "TeeterTotter",
        components: {Shape},

        setup() {
            const store = useStore();
            const shapesLeft = computed(() => store.state.shapesLeft);
            const shapesRight = computed(() => store.state.shapesRight);
            const rotateStyle = computed(() => `transform: rotate(${store.state.balance}deg);`)

            return {
                shapesLeft, shapesRight, rotateStyle
            };
        }
    }
</script>


<style lang="scss" scoped>
    .teeter-totter {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate3d(-50%, 0, 0);
        width: 600px;
        height: calc(100% - 64px);

        display: flex;
        flex-direction: column-reverse;
        align-items: center;
    }

    .teeter-totter__panel {
        width: 100%;
        height: 10px;
        background: darkgrey;

        transition: transform 1s;
    }

    .teeter-totter__platform {
        $width: 40px;
        $height: 120px;

        width: 0;
        height: 0;
        border-left: $width solid transparent;
        border-right: $width solid transparent;
        border-bottom: $height solid darkgray;
    }

    .teeter-totter__shapes {
        display: flex;
        width: 100%;
        height: auto;
        transition: transform 1s;
    }

    .teeter-totter__shapes > .side {
        position: relative;
        width: 50%;
        height: auto;
    }
</style>
