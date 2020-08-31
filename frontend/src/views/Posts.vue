<template>
  <div>
    <CreatePost />
    <Post v-for="post in posts" v-bind:key="post.id" :post="post" />
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

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
      post: {
        id: "",
        content: "",
        image: "",
      },
      posts: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>