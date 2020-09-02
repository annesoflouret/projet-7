<template>
  <div>
    <b-card
      id="card-size"
      bg-variant="light"
      text-variant="dark"
      class="mt-5 mb-5 mr-5"
      label="Small:"
      label-for="file-small"
      label-cols-sm="2"
      label-size="sm"
    >
      <b-media>
        <b-card-text id="user-size" class="mt-0">{{ comment.User.username }}</b-card-text>
        <b-card-text id="content-size">{{ comment.content }}</b-card-text>
        <b-card-text id="time-size">{{ moment(comment.createdAt).fromNow() }}</b-card-text>
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
import PostService from "../services/PostService";
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
      PostService.putDepublishComment.put(this.comment.id).then(() => {
        window.location.reload();
      });
    },
    publishComment() {
      PostService.putPublishComment.put(this.comment.id).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped>
.user-size {
  font-size: 15px;
}
#content-size {
  font-size: 17px;
}
#time-size {
  font-size: 10px;
}

#card-size {
  height: 50%;
  padding: 0;
  border: solid;
  border-color: navy;
}

#space {
  margin-left: none;
}
</style>