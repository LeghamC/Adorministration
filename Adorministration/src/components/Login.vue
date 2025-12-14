<template>
  <div class="page">
    <h2>{{ isSignup ? "Sign Up" : "Login" }}</h2>

    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />

    <!-- Extra fields only for signup -->
    <input
      v-if="isSignup"
      v-model="name"
      placeholder="Full Name"
    />
    <input
      v-if="isSignup"
      v-model="phone"
      placeholder="Phone Number"
    />
    <select v-if="isSignup" v-model="role">
      <option disabled value="">Select role</option>
      <option value="student">Student</option>
      <option value="receptionist">Receptionist</option>
      <option value="service">Service Personnel</option>
      <option value="admin">Administrator</option>
    </select>

    <button @click="submit">
      {{ isSignup ? "Create Account" : "Login" }}
    </button>

    <p class="toggle" @click="isSignup = !isSignup">
      {{ isSignup
        ? "Already have an account? Login"
        : "No account? Sign up" }}
    </p>

    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      isSignup: false,
      email: "",
      password: "",
      name: "",
      phone: "",
      role: "",
      error: ""
    };
  },
  methods: {
    async submit() {
      this.error = "";

      // Basic validation
      if (!this.email || !this.password) {
        this.error = "Email and password are required";
        return;
      }

      try {
        if (this.isSignup) {
          if (!this.name || !this.phone || !this.role) {
            this.error = "All fields are required for sign up";
            return;
          }

          await api.post("/auth/register", {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            role: this.role
          });

          // After successful signup → switch to login
          this.isSignup = false;
          this.error = "Account created successfully. Please login.";
        } else {
          const res = await api.post("/auth/login", {
            email: this.email,
            password: this.password
          });

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);

          // Role-based redirection
          if (res.data.role === "student") this.$router.push("/student");
          if (res.data.role === "admin") this.$router.push("/admin");
          if (res.data.role === "service") this.$router.push("/service");
          if (res.data.role === "receptionist")
            this.$router.push("/receptionist");
        }
      } catch (err) {
        this.error =
          err.response?.data?.message ||
          "Operation failed";
      }
    }
  }
};
</script>

<style>
.page {
  max-width: 320px;
  margin: 50px auto;
}
.toggle {
  color: blue;
  cursor: pointer;
  margin-top: 10px;
}
.error {
  color: red;
}
</style>
