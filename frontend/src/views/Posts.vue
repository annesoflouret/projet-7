


<template>
  <div id="wall" class="wall">
    <CreatePost />
    <Post v-for="post in allPosts" v-bind:key="post.id" :post="post" @infosPost="setInfos" />
    <!--<modalBoxModerate :post="post" />-->
  </div>
</template>

<script>
import axios from "axios";

import CreatePost from "../components/CreatePost";

export default {
  name: "Posts",
  components: {
    CreatePost,
    //Post,
    //modalBoxModerate,
  },
  data() {
    return {
      post: {
        id: "",
        content: "",
        image: "",
      },
      allPosts: [],
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
        this.allPosts = response.data;
      })
      .catch((error) => {
        console.log(error); //affiche pas le message 'normalement' envoyé par le back
      }),
      this.$store.dispatch("getUserInfos");
  },
};
</script>