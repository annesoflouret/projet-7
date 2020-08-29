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
        <b-nav-item v-if="user.token != null" to="/posts">Posts</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="user.token == null" to="/login">Login</b-nav-item>
        <b-nav-item v-if="user.token == null" to="/signup">Signup</b-nav-item>
        <b-nav-item v-if="user.token != null" to="/user">User</b-nav-item>
        <b-nav-item v-if="user.token != null" to="/logout" @click="logout">Logout</b-nav-item>
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
      this.$store.dispatch("updateUser", {
        username: null,
        userId: null,
        token: null,
        isAdmin: null,
      });
      this.$router.push({ path: "/login" });
    },
  },
};
</script>