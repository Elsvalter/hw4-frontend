<template>
  <div class="form">
    <h3>Login</h3>
    <label for="username">Username: </label>
    <input name="username" type="text" id="username" required v-model="username" />

    <label for="password">Password: </label>
    <input name="password" type="password" id="password" required v-model="password" />

    <button @click="login">Log In</button>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Login failed');
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('token', data.token);
          this.$router.push('/allposts');
        })
        .catch(error => {
          console.error('Login error:', error);
        });
    },
  },
};
</script>

<style scoped>
</style>
