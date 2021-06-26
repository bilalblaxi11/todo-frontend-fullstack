<template>
    <v-snackbar v-model="show" top right :color="color" :timeout="timeout">
        {{ message }}
        <v-btn text @click="show = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
                message: '',
                color: '',
                timeout: 2000
            }
        },

        created () {
            this.$store.subscribe((mutation, state) => {
                //console.log(mutation);
                if (mutation.type === 'snackbar/SHOW_SNACKBAR_MESSAGE') {
                    //console.log("reached");
                    this.message = state.snackbar.SnackBarMessage;
                    this.color = state.snackbar.SnackBarColor;
                    this.show = true;
                }
            });
        }
    };
</script>
