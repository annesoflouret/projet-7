<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/posts">
      <img
        width="50"
        class="imglogo"
        src="../assets/logo/icon-above-font.png"
        alt="Logo Groupomania"
      />
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="user" to="/posts">Mur</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!user" to="/login">Connexion</b-nav-item>
        <b-nav-item v-if="!user" to="/signup">Inscription</b-nav-item>
        <b-nav-item v-if="user" to="/user">Compte</b-nav-item>
        <b-nav-item v-if="user" to="/logout" @click="logout">Déconnexion</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.dispatch("updateUser", null);
      this.$router.push({ path: "/login" });
    },
  },
};
</script>