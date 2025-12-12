<template>
  <nav class="navbar">
      <div class="nav-content">
        <div class="logo">
          <img src="../public/favicon_bed.jpg" alt="favicon bed" class="logo-img" />
          <h1 class="logo-text">My Dormitory Management</h1>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
        </div>
      </div>
    </nav>
  <div id="app" class="app-container">
    <main class="content">
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },

  created() {
  },

  watch: {
  },

  methods: {
  },
};
</script>

<style scoped>
.app-container {
  font-family: 'Segoe UI', Roboto, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 30px;
}

.navbar {
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: brown;
  font-family: 'Segoe UI', Roboto, sans-serif;
  color: white;
  padding: 12px 0;
  border-bottom: 2px solid #ddd;
  margin: 0;
}

.nav-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.logo-text {
  font-size: 1.8em;
  color: white;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px 10px 10px 10px;
}

.nav-link:hover {
  background-color: #a40eefd5;
  padding: 10px 10px 10px 10px;
  border-radius: 3px;
}

.nav-link.router-link-exact-active {
  background-color: #a40eef70;
  padding: 10px 10px 10px 10px;
  border-radius: 3px;
}

.content {
  margin-top: 20px;
}
</style>
