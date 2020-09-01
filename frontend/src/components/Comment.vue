<template>
  <div>
    <b-card bg-variant="primary" text-variant="white" class="m-5">
      <b-media>
        <h2 class="mt-0">{{ comment.User.username }}</h2>
        <b-card-text>{{ comment.content }}</b-card-text>
        <b-card-text>{{ moment(comment.createdAt).fromNow() }}</b-card-text>
      </b-media>
      <button
        type="submit"
        v-if="user.isAdmin && comment.published == 1"
        @click.prevent="depublishComment"
        class="btn btn-danger btn-poster mb-3 mt-3"
      >Cacher</button>
      <button
        type="submit"
        v-if="user.isAdmin && comment.published == 0"
        @click.prevent="publishComment"
        class="btn btn-danger btn-poster mb-3 mt-3"
      >Afficher</button>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  name: "Comment",
  components: {},
  props: ["comment"],
  methods: {
    depublishComment() {
      axios
        .put(
          "http://localhost:3000/api/posts/" + this.comment.id + "/publish",
          { published: 0 },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          window.location.reload();
        });
    },
    publishComment() {
      axios
        .put(
          "http://localhost:3000/api/posts/" + this.comment.id + "/publish",
          { published: 1 },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          window.location.reload();
        });
    },
  },
};
</script>