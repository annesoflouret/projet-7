<template>
  <div>
    <b-row>
      <b-col sm="8">
        <h3>Mon profil</h3>
      </b-col>
      <b-col sm="4">
        <div class="float-right">
          <b-button v-on:click="deleteAccount" variant="danger" class="ml-2">Supprimer</b-button>
        </div>
      </b-col>
    </b-row>
    <p>Username: {{ user.username }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

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
      axios
        .delete("http://localhost:3000/api/auth/delete", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          localStorage.clear();
          setTimeout(() => {
            this.$router.push({ path: "#/signup" });
          }, 500);
          window.location.reload();
        })

        .catch((error) => console.log(error));
    },
  },
};
</script>