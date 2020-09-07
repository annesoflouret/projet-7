<template>
  <div id="space">
    <CreatePost />
    <Post v-for="post in posts" v-bind:key="post.id" :post="post" />
  </div>
</template>

<script>
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import PostService from "../services/PostService";

import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  name: "Posts",
  components: {
    CreatePost,
    Post,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    PostService.getPosts()
      .then((response) => {
        this.posts = response.data;
      })
      .catch((err) => {
        // Recuperation du message d'erreur du backend
        if (err.response.status != 404) {
          alert(err.response.data.error);
        }
      });
  },
};
</script>