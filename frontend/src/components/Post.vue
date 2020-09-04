<template>
  <div>
    <b-card bg-variant="secondary" text-variant="white" class="m-5">
      <div>
        <b-img v-if="post.imageUrl != null" :src="post.imageUrl" alt="image post" id="img-position"></b-img>
      </div>
      <div>
        <h2 class="mt-0">{{ post.id }}{{ post.User.username }}</h2>

        <b-card-text>{{ post.id }}{{ post.content }}</b-card-text>
        <b-card-text>{{ moment(post.createdAt).fromNow() }}</b-card-text>
      </div>
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
    <CreateComment :post_id="post.id" />
    <Comment class="ml-5" v-for="comment in comments" :key="comment.id" :comment="comment" />
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
      PostService.putDepublishPost(this.post.id).then(() => {
        window.location.reload();
      });
    },
    publishPost() {
      PostService.putPublishPost(this.post.id).then(() => {
        window.location.reload();
      });
    },
  },
  mounted() {
    PostService.getPostComments(this.post.id)
      .then((response) => {
        this.comments = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
#img-position {
  max-width: 200px;
  float: left;
}
</style>