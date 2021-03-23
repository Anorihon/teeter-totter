const mutations = {
    updateShapesLeft(state, payload = []){
        state.shapesLeft = payload;
    },
    updateShapesRight(state, payload = []){
        state.shapesRight = payload;
    },

    togglePause(state, payload = !state.isOnPause) {
        state.isOnPause = payload
    },
    toggleProgress(state, payload= !state.isInProgress) {
        state.isInProgress = payload
    },
    toggleEndState(state, payload = !state.isEnded) {
        state.isEnded = payload
    },

    setBalance(state, payload = 0) {
        state.balance = payload
    },
};

export default mutations;