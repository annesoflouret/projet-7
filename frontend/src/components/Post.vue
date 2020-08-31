<template>
  <div>
    <b-card bg-variant="secondary" text-variant="white" class="m-5">
      <b-media>
        <h2 class="mt-0">{{ post.id }}{{ post.User.username }}</h2>
        <b-img
          v-if="post.imageUrl != null"
          :src="post.imageUrl"
          fluid
          alt="image post"
          style="max-width: 200px; float: left;"
        ></b-img>
        <b-card-text>{{ post.id }}{{ post.content }}</b-card-text>
        <b-card-text>{{ moment(post.createdAt).fromNow() }}</b-card-text>
      </b-media>
    </b-card>
    <CreateComment :post_id="post.id" />
    <Comment class="ml-5" v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script>
import Comment from "../components/Comment";
import CreateComment from "../components/CreateComment";
import axios from "axios";

export default {
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
  mounted() {
    axios
      .get("http://localhost:3000/api/posts/" + this.post.id + "/comments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.comments = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>