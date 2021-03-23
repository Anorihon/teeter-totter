import {SHAPE} from "../utils/constants";

const actions = {
    addShapeLeft({commit, state, dispatch}) {
        commit('togglePause', false);
        commit('updateShapesLeft', [
            ...state.shapesLeft,
            {
                ...SHAPE(),
            }
        ]);
        dispatch('addShapeRight');
    },

    addShapeRight({commit, state}) {
        commit('updateShapesRight', [
            ...state.shapesRight,
            {
                ...SHAPE(),
            }
        ]);
    },

    calculateBalance({commit, state, dispatch}) {
        const leftForce = state.shapesLeft.reduce((acc, shape) => {
            return acc += shape.weight * (4 - shape.column + 1)
        }, 0);
        const rightForce = state.shapesRight.reduce((acc, shape) => {
            return acc += shape.weight * (shape.column + 1)
        }, 0);

        const totalForce = leftForce > rightForce ?
            (((leftForce - rightForce) / leftForce) * -100) / 2 :
            (((rightForce - leftForce) / rightForce) * 100) / 2;

        console.log('totalForce', totalForce);

        if(totalForce >= state.maxBalance) {
            commit('setBalance', state.maxBalance);
            dispatch('stopSimulation');
            return;
        }
        if(totalForce <= -state.maxBalance) {
            commit('setBalance', -state.maxBalance);
            dispatch('stopSimulation');
            return;
        }
        commit('setBalance', totalForce);
    },

    resetShapes({ commit }) {
        commit('updateShapesLeft');
        commit('updateShapesRight');
        commit('toggleProgress', false);
        commit('toggleEndState', false);
    },

    resetBalance({commit}) {
        commit('setBalance');
    },

    stopSimulation({commit}) {
        commit('togglePause');
        commit('toggleEndState');
    },
};

export default actions;