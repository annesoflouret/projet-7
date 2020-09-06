<template>
<body class="body-intro">
  <main class="main">
    <form class="cadre w-50 m-auto">
      <div class="container mt-5">
        <div class="text-center">
          <h1 class="m-3">Inscrivez-vous</h1>
        </div>
        <div class="form-group">
          <label for="inputEmail">Votre e-mail</label>
          <input type="email" class="form-control" id="inputEmail" v-model="dataSignup.email" />
        </div>
        <div class="form-group">
          <label for="inputUsername">Votre nom d'utilisateur</label>
          <input type="text" class="form-control" id="inputUsername" v-model="dataSignup.username" />
        </div>
        <div class="form-group">
          <label for="inputPassword">Votre mot de passe</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataSignup.password"
          />
          <small>Votre mot de passe doit contenir entre 6 et 10 caractères dont 1 majuscule et 1 minuscule</small>
        </div>
        <b-button @click.prevent="sendSignup" type="submit" class="mb-3 mt-3">Créer mon compte</b-button>
      </div>
    </form>
  </main>
</body>
</template>

<script>
import UserService from "../services/UserService";
export default {
  name: "SignUp",
  data() {
    return {
      dataSignup: {
        username: null,
        email: null,
        password: null,
      },
      msg: "",
    };
  },
  methods: {
    // requête pour créer un user, sécurisé grâce aux regex
    sendSignup() {
      const regexPassword = /((?=.*[a-z])(?=.*[A-Z]).{6,10})/;
      const regexEmail = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
      if (
        (this.dataSignup.email !== null || this.dataSignup.password !== null) &&
        regexPassword.test(this.dataSignup.password) &&
        regexEmail.test(this.dataSignup.email)
      ) {
        UserService.postSignup(this.dataSignup)
          .then(() => {
            this.$router.push({ path: "Login" });
            //Réinitialisation des champs après saisie
            this.dataSignup.email = null;
            this.dataSignup.password = null;
          })
          .catch((err) => {
            // Recuperation du message d'erreur du backend
            alert(err.response.data.error);
          });
      } else {
        alert("Merci de remplir correctement les champs ");
      }
    },
  },
};
</script>