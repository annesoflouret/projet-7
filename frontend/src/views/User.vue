<template>
  <div>
    <b-col class="mt-5 text-center">
      <h3>Mon profil</h3>
    </b-col>
    <b-col sm="4"></b-col>

    <div class="float-center">
      <p class="m-5">Compte: {{ user.username }}</p>
    </div>
    <div class="float-center">
      <b-button v-on:click="deleteAccount">Supprimer</b-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UserService from "../services/UserService";

export default {
  data() {
    return {
      deleteUser: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  name: "User",
  components: {},
  methods: {
    deleteAccount() {
      alert((this.deleteUser = "Votre compte à bien été supprimé"));
      UserService.deleteUser()
        .then(() => {
          localStorage.clear();
          this.$store.dispatch("updateUser", null);
          this.$router.push({ path: "/login" });
        })

        .catch((err) => {
          // Recuperation du message d'erreur du backend
          alert(err.response.data.error);
        });
    },
  },
};
</script>