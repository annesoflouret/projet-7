<template>
  <div>
    <h1 class="mt-5 d-flex justify-content-center">Connection</h1>
    <div class="input-group input-group-lg">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-lg">E-Mail</span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
      />
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-lg">Password</span>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
    </div>
    <b-button v-on:click="publish">Connection</b-button>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style>
</style>
