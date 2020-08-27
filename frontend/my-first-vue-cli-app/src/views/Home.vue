<!--<template>
  <div>
    <h1 class="mt-5 d-flex justify-content-center">Connection</h1>
    <b-row class="my-1 cols-md">
      <b-col align-self="center" sm="2">
        <label for="input-default">Email:</label>
      </b-col>
      <b-col sm="5">
        <b-form-input id="input-default" placeholder="Enter your Email"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="my-1">
      <b-col sm="2">
        <label for="input-default">Password:</label>
      </b-col>
      <b-col sm="5">
        <b-form-input id="input-default" placeholder="Enter your password"></b-form-input>
      </b-col>
    </b-row>
    <b-button v-on:click="publish">Connection</b-button>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
</style>-->

<template>
  <form @submit.prevent="submit()" class="cadre w-60 m-auto">
    <div class="container">
      <h1 class="mt-5 d-flex justify-content-center">Connection</h1>
      <b-row class="my-1 cols-md d-flex justify-content-center">
        <b-col sm="1">
          <label for="input-default">Email:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input id="input-default" placeholder="Enter your Email"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1 d-flex justify-content-center">
        <b-col sm="1">
          <label for="input-default">Password:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input id="input-default" placeholder="Enter your password"></b-form-input>
        </b-col>
      </b-row>
      <b-button class="d-flex justify-content-center" v-on:click="publish">Connection</b-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    submit() {
      this.$emit("submit", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
