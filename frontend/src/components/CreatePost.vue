<template>
  <div class="mx-auto border border-primary mt-5 p-4 col-10">
    <div class="block-post">
      <h1 class="mt-2">Ajouter une publication</h1>
      <form enctype="multipart/form-data" action="/create" method="post">
        <div class="input-group">
          <label for="test">Message:</label>
          <textarea
            v-model="contentPost.content"
            class="input col-12"
            id="test"
            rows="3"
            type="text"
            :placeholder="'Que voulez vous dire ' + user.username + ' ?'"
          />
        </div>
        <div>
          <div class="mt-3 text-left">
            Télécharger une image
            <input
              class="w-100"
              type="file"
              title="Aucun fichier"
              @change="chooseFile"
            />
          </div>
        </div>
        <b-button type="submit" @click.prevent="createPost" class="btn btn-poster mb-3 mt-3">Publier</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import PostService from "../services/PostService";
import { mapState } from "vuex";
export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        content: null,
        postImage: null,
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // Créer un post
    createPost() {
      const formdata = new FormData();
      //Stock les infos du post
      formdata.append("image", this.contentPost.postImage); // Image
      formdata.append("content", this.contentPost.content); // Texte
      PostService.postPost(formdata)
        .then((response) => {
          // Rechargement de la page
          if (response) {
            window.location.reload();
          }
        })
        .catch((err) => {
          // Recuperation du message d'erreur du backend
          alert(err.response.data.error);
        });
    },
    chooseFile(event) {
      this.contentPost.postImage =
        event.target.files[0] || event.dataTransfer.files;
    },
  },
};
</script>