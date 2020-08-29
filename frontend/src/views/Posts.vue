<template>
  <div>
    <CreatePost />
    <Post v-for="post in posts" v-bind:key="post.id" :post="post" />
    <!--<modalBoxModerate :post="post" />-->
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
    //modalBoxModerate,
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
  methods: {
    setInfos(payload) {
      this.post = payload.post;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      //.get("http://localhost:3000/api/post",this.$store.state.headerParams)
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back
      });
    //this.$store.dispatch("getUserInfos");
  },
};
</script>