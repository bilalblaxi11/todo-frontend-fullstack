import axios from "axios";
export default {
    namespaced: true,
    state: {
        tasks: [],
        task: {}
    },
    mutations: {
        SET_TASK(state, payload){
            state.task = payload;
        },
        SET_TASKS(state, payload){
            state.tasks = payload;
        },
    },
    actions: {
        async get({commit, state}){
            return await axios.get(`/api/tasks?page=1`).then(response => {
                console.log(response.data)
                commit('SET_TASKS', response.data);
                console.log(state.tasks);
                return response;
            });
        },
        async getTask({commit, state},id){
            return await axios.get(`/api/tasks/${id}`).then(response => {
                console.log(response.data)
                commit('SET_TASK', response.data);
                console.log(state.task);
                return response;
            });
        },
        async add({commit, state},task){
            return await axios.post(`/api/tasks/create`,task).then(response => {
                console.log(response.data)

                commit('SET_TASKS', [task, ...state.tasks]);
                return response;
            });
        },
        async update({state}){
            return await axios.post(`/api/tasks/${state.task.id}/update`,state.task).then(response => {
                console.log(response.data)
                return response;
            });
        },
        async delete({state, commit}, id){
            return await axios.post(`/api/tasks/${id}/delete`).then(response => {
                commit('SET_TASKS', state.tasks.filter(function (task){
                    return task.id !== id;
                }));
                console.log(response.data)
                return response;
            });
        },
    }
}