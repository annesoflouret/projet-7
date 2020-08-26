<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import PostService from "@/services/PostService";

export default {
  data() {
    return {
      posts: [],
    };
  },
  created() {
    PostService.getPosts()
      .then((response) => {
        this.posts = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
