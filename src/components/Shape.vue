<template>
    <div
            class="shape"
            :class="classes"
            :style="styles"
    >
        <div class="shape__weight">{{weight}}kg</div>
    </div>
</template>

<script>
    import {computed, ref, onMounted, onUnmounted} from 'vue';
    import { useStore } from 'vuex';
    import {SHAPES} from "../utils/constants";

    export default {
        name: "Shape",
        props: {
            type: {
                type: Number,
                default: SHAPES.square
            },
            weight: {
                type: Number,
                default: 1
            },
            color: {
                type: String,
                default: 'lightsalmon'
            },
            isStatic: {
                type: Boolean,
                default: true
            },
            initColumn: {
                type: Number,
                default: 1
            }
        },

        setup(props) {
            const store = useStore();

            const STEP_X = 15;
            const STEP_Y = 50;
            const COLUMNS = 4;

            const column = ref(props.initColumn);

            const positionX = computed(() => {
                // column index * column size - offset to be in center
                return column.value * 75 - 7.5;
            });
            const positionY = ref(0);

            const classes = computed(() => {
                return {
                    'shape--square': props.type === SHAPES.square,
                    'shape--triangle': props.type === SHAPES.triangle,
                    'shape--circle': props.type === SHAPES.circle
                };
            });
            const styles = computed(() => {
                return {
                    transform: `translate3d(${positionX.value}px, ${positionY.value}px, 0) scale(${.8 + props.weight * .02})`,
                    backgroundColor: props.color,
                    borderColor: props.type === SHAPES.triangle ? `transparent transparent ${props.color} transparent` : 'none',
                };
            });
            const placed = computed(() => {
                return positionY.value >= 0;
            });
            const isOnPause = computed(() => store.state.isOnPause);
            const isEnded = computed(() => store.state.isEnded);

            const handleKeyDown = event => {
                if(props.isStatic || placed.value) return;

                let next_column = column.value;

                if(event.key == 'ArrowRight' || event.key == 'd') {
                    next_column++;
                }else if(event.key == 'ArrowLeft' || event.key == 'a'){
                    next_column--;
                }

                if(next_column < 0) next_column = 0;
                if(next_column >= COLUMNS) next_column = COLUMNS - 1;

                column.value = next_column;
            };

            onMounted(() => {
                if (props.isStatic === false) {
                    // Place Shape: -window height + height of teeter + height of nav + max shape height
                    positionY.value = -window.innerHeight + 130 + 64 + 50;

                    const loopInterval = setInterval(() => {
                        if (!isOnPause.value) {
                            const nextPositionY = positionY.value + STEP_Y;
                            positionY.value = nextPositionY > 0 ? 0 : nextPositionY;
                        }

                        if (placed.value) {
                            store.dispatch('calculateBalance');
                            setTimeout(() => {
                                if (isEnded.value) return;
                                store.dispatch('addShapeLeft');
                            }, 1000);
                            clearInterval(loopInterval);
                        }
                    }, 100);
                }
            });

            onUnmounted(() => {
                window.removeEventListener('keydown', handleKeyDown);
            });

            window.addEventListener('keydown', handleKeyDown);

            return {
                STEP_X, STEP_Y,
                positionX, positionY,

                classes, styles, placed, isOnPause, isEnded,

                handleKeyDown,
            };
        },
    }
</script>

<style lang="scss" scoped>
    .shape {
        position: absolute;
        left: 0;
        bottom: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        width: 50px;
        height: 50px;
        background: lightsalmon;

        transform-origin: center bottom;
    }

    .shape__weight {
        color: #fff;
        font-size: .8rem;
    }

    .shape--triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 40px 50px 40px;
        background-color: transparent !important;
        border-color: transparent transparent lightsalmon transparent;
        line-height: 60px;
        align-items: flex-start;
    }

    .shape--circle {
        border-radius: 100%;
    }
</style>