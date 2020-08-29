<template>
  <div>
    <div class="block-post w-75 mt-5">
      <h1 class="mt-2">Ajouter une publication</h1>
      <form enctype="multipart/form-data" action="/create" method="post">
        <div class="input-group">
          <label for="input">Écrivez dans ce champs</label>
          <textarea v-model="contentPost.content" class="input" rows="3" id="input" type="text" />
        </div>

        <div>
          <div class="inputImg">
            Télécharger une image
            <input
              placeholder="Choisir un fichier"
              id="file"
              type="file"
              class="inputImg"
              @change="chooseFile"
            />
          </div>
          <div class="mb-3" id="preview">
            <!--<img v-if="imgPreview" :src="imgPreview" />-->
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
</template>

<script>
// import d'axios pour les requêtes et de la bibliothèque vuex
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        content: null,
        postImage: null,
        imageData: "",
      },
      msgError: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // Fonction pour créer un post
    createPost() {
      const formdata = new FormData();
      //on déclare une constante FormData pour stocker les infos du Post
      formdata.append("image", this.contentPost.postImage); // L'image postée
      formdata.append("content", this.contentPost.content); // Le texte posté
      axios
        .post("http://localhost:3000/api/posts", formdata, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          // Si la requête fonctionne, on recharge la page pour afficher le dernier post dans le Wall
          if (response) {
            window.location.reload();
          }
        }) // Sinon, on affiche une erreur de requête
        .catch((error) => (this.msgError = error));
    },
    chooseFile(event) {
      this.contentPost.postImage =
        event.target.files[0] || event.dataTransfer.files;
      /* var input = event.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.contentPost.imageData = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }*/
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