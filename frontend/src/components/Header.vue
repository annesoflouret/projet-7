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
        <b-nav tabs justified class="navbar navbar-light bg-light navbar-dark bg-dark">
          <router-link class="navbar-link" to="/wall">
            <img
              width="100"
              class="imglogo"
              src="../src/assets/logo/icon-above-font.png"
              alt="Logo Groupomania"
            />
          </router-link>
          <router-link to="/">Home</router-link>|
          <router-link to="/posts">Posts</router-link>|
          <router-link to="/user">User</router-link>|
          <router-link to="/signup">Signup</router-link>|
          <router-link to="/comments">Commentaires</router-link>
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
        </b-nav>
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
