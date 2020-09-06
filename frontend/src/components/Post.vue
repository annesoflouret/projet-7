<template>
  <div>
    <b-card bg-variant="secondary" text-variant="white" class="m-5">
      <div>
        <b-img
          v-if="post.imageUrl != null"
          :src="post.imageUrl"
          alt="image post"
          class="img-position float-left"
        ></b-img>
      </div>
      <div>
        <b-card-text id="text-size">{{ post.content }}</b-card-text>
        <b-card-text class="mt-0">Publié par {{ post.User.username }}</b-card-text>
        <b-card-text>{{ moment(post.createdAt).fromNow() }}</b-card-text>
      </div>
      <!-- Button de modération, cacher et/ou afficher les commentaires et les posts -->
      <button
        type="submit"
        v-if="user.isAdmin && post.published == 1"
        @click.prevent="depublishPost"
        class="btn btn-danger btn-poster mb-3 mt-3"
      >Cacher</button>
      <button
        type="submit"
        v-if="user.isAdmin && post.published == 0"
        @click.prevent="publishPost"
        class="btn btn-danger btn-poster mb-3 mt-3"
      >Afficher</button>
    </b-card>
    <!-- Affichage du formulaire de création de commentaires -->
    <CreateComment :post_id="post.id" />
    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import Comment from "../components/Comment";
import CreateComment from "../components/CreateComment";
import { mapState } from "vuex";
import PostService from "../services/PostService";

export default {
  computed: {
    ...mapState(["user"]),
  },
  name: "Post",
  components: {
    Comment,
    CreateComment,
  },
  data() {
    return {
      comments: [],
    };
  },
  props: ["post"],
  methods: {
    depublishPost() {
      PostService.putDepublishPost(this.post.id)
        .then(() => {
          window.location.reload(); // Recharge la page
        })
        .catch((err) => {
          // Recuperation du message d'erreur du backend
          alert(err.response.data.error);
        });
    },
    publishPost() {
      PostService.putPublishPost(this.post.id)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          // Recuperation du message d'erreur du backend
          alert(err.response.data.error);
        });
    },
  },
  mounted() {
    // Appelle tous les commentaires liés à la publication
    PostService.getPostComments(this.post.id)
      .then((response) => {
        this.comments = response.data;
      })
      .catch((err) => {
        if (err.response.status != 404) {
          alert(err.response.data.error);
        }
      });
  },
};
</script>

<style scoped>
.img-position {
  max-width: 200px;
  width: 100%;
}
#text-size {
  font-size: 30px;
}
</style>