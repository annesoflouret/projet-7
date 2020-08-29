<template>
  <div>
    <b-card bg-variant="secondary" text-variant="white" class="m-5">
      <b-media>
        <h5 class="mt-0">{{ post.User.username }}</h5>
        <b-img
          v-if="post.imageUrl != null"
          :src="post.imageUrl"
          fluid
          alt="image post"
          style="max-width: 200px; float: left; margin-right: 20px;"
        ></b-img>
        <p>{{ post.content }}</p>
        <p>{{ moment(post.createdAt).fromNow() }}</p>
      </b-media>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["post"],
};
</script>