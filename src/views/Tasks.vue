<template>
  <v-container >
    <template v-if="!addTaskTemp && !editTaskTemp">

      <div class="overflow-hidden my-5">
        <h1 class="float-left">Tasks</h1>

        <v-btn color="indigo" dark class="float-right" @click="addTaskTemp = !addTaskTemp">Create Task</v-btn>
      </div>

      <v-list
          flat
      >
        <v-list-item :key="task.id" v-for="task in tasks" class="list-border">
          <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon small @click="editTask(task.id)">
              <v-icon color="indigo lighten-1">mdi-pencil</v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-action>
            <v-btn icon small @click="deleteTask(task.id)">
              <v-icon color="red lighten-1">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </template>
    <template v-if="addTaskTemp">
      <h1 class="my-5">Add Task</h1>
      <v-form class="mt-3">
        <v-text-field v-model="taskData.title" placeholder="Title"></v-text-field>
        <v-textarea v-model="taskData.description" placeholder="Description"></v-textarea>
        <v-btn class="mr-1" color="success" @click="addTask">Save</v-btn>
        <v-btn color="red" dark @click="cancel">Cancel</v-btn>
      </v-form>
    </template>
    <template v-if="editTaskTemp">
      <h1 class="my-5">Edit Task</h1>
      <v-form class="mt-3">
        <v-text-field v-model="task.title" placeholder="Title"></v-text-field>
        <v-textarea v-model="task.description" placeholder="Description"></v-textarea>
        <v-btn color="success" class="mr-1" @click="updateTask">Save</v-btn>
        <v-btn color="red" dark @click="cancel">Cancel</v-btn>
      </v-form>
    </template>
  </v-container>
</template>
<script>

import { mapState,mapMutations } from 'vuex';
export default {
  name: "Tasks",
  data(){
    return {
      taskData: {
        title: "",
        description: ""
      },
      addTaskTemp: false,
      editTaskTemp: false
    }
  },
  methods: {
    ...mapMutations({
      showAlert: 'snackbar/SHOW_SNACKBAR_MESSAGE',
    }),
    addTask: function(){
      this.$store.dispatch('task/add', this.taskData).then(() =>{
        this.showAlert({color: "green", message: 'Task Created Successfully'});
        this.cancel();
        this.taskData.title = "";
        this.taskData.description = "";
      }).catch(error => {
        this.handleError(error)
      });
    },
    editTask: async function(id) {
      await this.$store.dispatch('task/getTask',id);
      this.editTaskTemp = true;
    },
    updateTask: async function() {
      await this.$store.dispatch('task/update').then(() => {
        let objIndex = this.tasks.findIndex((obj => obj.id === this.task.id));
        this.tasks[objIndex] = this.task;
        this.cancel();
        this.showAlert({color: "green", message: 'Task updated Successfully'});
      }).catch(error => {
        this.handleError(error)
      });

    },
    deleteTask: async function(id) {
      await this.$store.dispatch('task/delete',id).catch(error => {
        console.log(error);
      });
      this.showAlert({color: "green", message: 'Task Deleted Successfully'});

    },
    cancel: function() {
      this.addTaskTemp = false;
      this.editTaskTemp = false;
    },

    handleError(error){

      if (error.response.status === 422) {
          this.showAlert({
            color: "red",
            message: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]
          })
      } else {

        for(let item in error.response.data.errors){
          this.showAlert({
            color: "red",
            message: "Something went wrong."
          })
        }

      }
    },
  },
  computed:{
    ...mapState('task', {
      tasks: state => state.tasks,
      task: state => state.task
    }),
  },
  created() {
    this.$store.dispatch('task/get')
  }
}
</script>
<style>
.list-border {
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}
</style>