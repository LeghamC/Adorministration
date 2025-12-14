<template>
  <div>
    <nav v-if="isLoggedIn">
      <span>Dormitory System</span>
      <button @click="logout">Logout</button>
    </nav>

    <!-- All pages render here -->
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
nav {
  padding: 10px;
  background: #eee;
  display: flex;
  justify-content: space-between;
}
</style>
