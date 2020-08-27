<template>
<div>
  <div>
    <title>Page d'accueil - Groupomania</title>
    <meta name="description" content="Page d'accueil - Groupomania Intranet" />
    <meta name="viewport" />
  </div>
  <body>
    <div>
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark">
          <!--<img width="100" src="../src/assets/logo/icon-above-font.png" alt="Logo Gourpmania" />-->
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <router-link to="/">Home</router-link>|
          <router-link to="/posts">Posts</router-link>|
          <router-link to="/user">User</router-link>|
          <router-link to="/signup">Signup</router-link>|
          <router-link to="/comments">Commentaires</router-link>
        </nav>
      </header>
    </div>
  </body>
  <router-view />
</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
