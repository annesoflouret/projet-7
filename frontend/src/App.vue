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
        <div>
          <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">
              <router-link class="navbar-link" to="/wall">
                <img
                  width="50"
                  class="imglogo"
                  src="../src/assets/logo/icon-above-font.png"
                  alt="Logo Groupomania"
                />
              </router-link>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item href="#">
                  <router-link to="/posts">Posts</router-link>
                </b-nav-item>
                <b-nav-item href="#">
                  <router-link to="/comments">Commentaires</router-link>
                </b-nav-item>
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                    <em>User</em>
                  </template>
                  <b-dropdown-item href="#">
                    <router-link to="/">Home</router-link>
                  </b-dropdown-item>
                  <b-dropdown-item href="#">
                    <router-link to="/signup">Signup</router-link>
                  </b-dropdown-item>
                  <b-dropdown-item href="#">
                    <router-link to="/user">User</router-link>
                  </b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </header>
    </div>
  </body>
  <router-view />
</div>
</template>

<script>
export default {};
</script>

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
