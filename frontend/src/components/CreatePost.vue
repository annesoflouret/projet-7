<template>
  <b-row class="justify-content-md-center">
    <div>
      <div class="block-post mt-5">
        <h1 class="mt-2">Ajouter une publication</h1>
        <form enctype="multipart/form-data" action="/create" method="post">
          <div class="input-group">
            <label for="input"></label>
            <textarea
              v-model="contentPost.content"
              class="input"
              rows="3"
              id="input"
              type="text"
              placeholder="Écrivez dans ce champs"
            />
          </div>

          <div>
            <div class="inputImg">
              Télécharger une image
              <input
                id="file"
                type="file"
                class="inputImg"
                @change="chooseFile"
              />
            </div>
          </div>
          <button
            type="submit"
            @click.prevent="createPost"
            class="btn btn-secondary btn-poster mb-3 mt-3"
          >Publier</button>
        </form>
      </div>
    </div>
  </b-row>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        content: null,
        postImage: null,
      },
      msgError: "",
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
      axios
        .post("http://localhost:3000/api/posts", formdata, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          // Rechargement de la page
          if (response) {
            window.location.reload();
          }
        }) // Sinon, on affiche une erreur de requête
        .catch((error) => (this.msgError = error));
    },
    chooseFile(event) {
      this.contentPost.postImage =
        event.target.files[0] || event.dataTransfer.files;
    },
  },
};
</script>

<style>
.input-text {
  width: 100%;
}
.input-group {
  padding: 2%;
}
h3 {
  text-align: center;
}
.block-post {
  border: grey 1px solid !important;
}
.image-preview {
  padding: 20px;
}
img.preview {
  border: 1px solid rgb(20, 20, 20);
  padding: 5px;
}
.btn-poster {
  margin-left: 75%;
}
</style>