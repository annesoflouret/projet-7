<template>
  <form @submit.prevent="submit()" class="cadre w-60 m-auto">
    <div class="container">
      <h1 class="mt-5 mb-5 d-flex justify-content-center">Bienvenue sur Groupomania</h1>
      <h2 class="mt-5 mb-5 d-flex justify-content-center">Connection</h2>
      <b-row class="my-1 cols-md d-flex justify-content-center">
        <b-col sm="2">
          <label for="input-default">Email:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input id="input-default" placeholder="Enter your Email"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1 d-flex justify-content-center">
        <b-col sm="2">
          <label for="input-default">Mot de passe:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input id="input-default" placeholder="Enter your password"></b-form-input>
        </b-col>
      </b-row>
      <div class="d-flex justify-content-center mt-5">
        <b-button @click.prevent="login" type="submit">Connection</b-button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
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
    login() {
      if (this.dataLogin.email !== null || this.dataLogin.password !== null) {
        axios
          .post("http://localhost:3000/api/auth/login", this.dataLogin)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            this.$router.push({ path: "Posts" });
          })
          .catch((error) => {
            console.log(error);
            this.revele = !this.revele;
          });
      }
    },
  },
};
</script>
<style scoped>
</style>
