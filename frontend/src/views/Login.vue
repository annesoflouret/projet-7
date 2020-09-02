<template>
  <form class="cadre w-60 m-auto">
    <div class="container">
      <h1 class="mt-5 mb-5 d-flex justify-content-center">Bienvenue sur Groupomania</h1>
      <h2 class="mt-5 mb-5 d-flex justify-content-center">Connection</h2>
      <b-row class="my-1 cols-md d-flex justify-content-center">
        <b-col sm="2">
          <label for="input-default">Email:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input id="input-default" placeholder="Enter your Email" v-model="dataLogin.email"></b-form-input>
        </b-col>
      </b-row>

      <b-row class="my-1 d-flex justify-content-center">
        <b-col sm="2">
          <label for="input-default">Mot de passe:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input
            type="password"
            id="input-default"
            placeholder="Enter your password"
            v-model="dataLogin.password"
          ></b-form-input>
        </b-col>
      </b-row>
      <div class="d-flex justify-content-center mt-5">
        <b-button @click.prevent="login" type="submit">Connection</b-button>
      </div>
    </div>
  </form>
</template>

<script>
import UserService from "../services/UserService";
export default {
  data() {
    return {
      dataLogin: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      if (this.dataLogin.email !== "" && this.dataLogin.password !== "") {
        UserService.postLogin(this.dataLogin)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            this.$store.dispatch("updateUser", response.data);
            this.$router.push({ path: "posts" });
          })
          .catch((err) => {
            alert(err.response.data.error);
          });
      } else {
        alert("L'email ou le mot de passe n'existe pas!");
      }
    },
  },
};
</script>
<style scoped>
</style>
