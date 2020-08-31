<template>
  <div>
    <b-row>
      <b-col sm="8">
        <h3>Mon profil</h3>
      </b-col>
      <b-col sm="4">
        <div class="float-right">
          <b-button v-on:click="deleteUser" variant="danger" class="ml-2">Supprimer</b-button>
        </div>
      </b-col>
    </b-row>
    <hr />
    <b-alert
      show
      dismissible
      fade
      variant="success"
      v-if="$route.params.message"
    >{{ $route.params.message }}</b-alert>

    <p>Username: {{ user.username }}</p>
    <p>Email : {{ user.email }}</p>
  </div>
</template>

<script>
export default {
  name: "User",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async deleteUser() {
      try {
        //let response = await axios.delete("user/me");

        localStorage.clear();

        document.location.reload(true);
        this.$router.replace({
          name: "login",
          params: { message: "Compte supprimé !" },
        });
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
};
</script>