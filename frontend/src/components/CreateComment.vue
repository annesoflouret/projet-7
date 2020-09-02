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
import { mapState } from "vuex";
import PostService from "../services/PostService";
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
      PostService.postCreateComment(this.post_id, this.contentComment)

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