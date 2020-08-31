<template>
  <div>
    <b-card bg-variant="primary" text-variant="white" class="m-5">
      <b-media>
        <h2 class="mt-0">{{ comment.User.username }}</h2>
        <b-card-text>{{ comment.content }}</b-card-text>
        <b-card-text>{{ moment(comment.createdAt).fromNow() }}</b-card-text>
      </b-media>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Comment",
  components: {},
  props: ["comment"],
};
</script>