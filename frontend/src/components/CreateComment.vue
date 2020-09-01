<template>
  <b-row class="mt-2 m-5 w-75">
    <b-col sm="2">
      <label for="textarea-default">Commentaire:</label>
    </b-col>
    <b-col sm="10">
      <b-form-textarea
        v-model="contentComment.content"
        id="textarea-default"
        placeholder="Écrivez votre commentaire ici"
      ></b-form-textarea>
      <button
        type="submit"
        @click.prevent="createComment"
        class="btn btn-primary btn-poster mb-3 mt-3"
      >Publier</button>
    </b-col>
  </b-row>
</template>


<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "CreateComment",
  props: ["post_id"],
  data() {
    return {
      contentComment: {
        content: null,
      },
      msgError: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // Créer un commentaire
    createComment() {
      axios
        .post(
          "http://localhost:3000/api/posts/" + this.post_id + "/comments",
          this.contentComment,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          // Rechargement de la page
          if (response) {
            window.location.reload();
          }
        })
        .catch((error) => (this.msgError = error));
    },
  },
};
</script>