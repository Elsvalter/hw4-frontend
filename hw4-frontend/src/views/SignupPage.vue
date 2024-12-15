<template>
  <div class="form">
    <h3>Sign Up</h3>
    <label for="username">Username: </label>
    <input name="username" type="text" id="username" required v-model="username" />

    <label for="password">Password: </label>
    <input name="password" type="password" id="password" required v-model="password" />

    <button @click="signup">Sign Up</button>
    <p>Already have an account? <router-link to="/login">Log In</router-link></p>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    signup() {
      fetch('http://localhost:3000/api/signup', {
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
            throw new Error('Signup failed');
          }
          return response.json();
        })
        .then(() => {
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('Signup error:', error);
        });
    },
  },
};
</script>

<style scoped>
</style>
