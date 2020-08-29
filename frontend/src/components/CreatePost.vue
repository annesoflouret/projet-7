<template>
  <div>
    <h3 class="d-flex justify-content-center">Ajouter une publication</h3>
    <hr />
    <b-alert show fade variant="danger" v-if="error">{{ error }}</b-alert>

    <b-form @submit.prevent="createPost" enctype="multipart/form-data">
      <div class="mb-3" id="preview">
        <img v-if="imgPreview" :src="imgPreview" />
      </div>

      <div class="mb-3 d-flex justify-content-center">Ajouter une image</div>
      <input class="d-flex justify-content-center w-50" type="file" ref="file" @change="selectFile" />

      <b-form-group id="input-group-1" label="Publication: " label-for="input-post">
        <b-form-input
          id="input-post"
          type="text"
          placeholder="Entrer un message"
          required
          v-model="post.post"
          class="d-flex justify-content-center"
        ></b-form-input>
      </b-form-group>

      <b-button class="float-right" type="submit" variant="primary">Publier</b-button>
    </b-form>

    <div></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddPost",
  components: {},
  data() {
    return {
      post: {
        post: "",
      },
      imgPreview: "",
      file: "",
      error: "",
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.imgPreview = URL.createObjectURL(this.file);
    },
    async createPost() {
      const formData = new FormData();
      formData.append("post", this.post.post);
      formData.append("file", this.file);
      try {
        let response = await axios.post("posts", formData);
        console.log(response.data);
        this.$router.replace({
          name: "postsList",
          params: { message: response.data.success },
        });
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
};
</script>
<style scoped>
</style>