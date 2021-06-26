
export default  {
    namespaced: true,
    state: {
        color: "",
        message: ""
    },
    mutations: {
        SHOW_SNACKBAR_MESSAGE(state, payload) {
            console.log(payload);
            state.SnackBarMessage = payload.message;
            state.SnackBarColor = payload.color;
        }
    }
};
