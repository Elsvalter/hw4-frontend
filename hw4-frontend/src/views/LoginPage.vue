<template>
<<<<<<< HEAD
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>

      <button type="submit" :disabled="!isFormValid">Log In</button>
    </form>
    <div class="signup-link">
      <p>Don't have an account? <a @click="redirectToSignup">Sign up</a></p>
    </div>
=======
  <div class="form">
    <h3>Login</h3>
    <label for="username">Username: </label>
    <input name="username" type="text" id="username" required v-model="username" />

    <label for="password">Password: </label>
    <input name="password" type="password" id="password" required v-model="password" />

    <button @click="login">Log In</button>
    <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
>>>>>>> 14af949c98d4c1c45fbc907c83f47d2cccd64d10
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
<<<<<<< HEAD
      email: '',
      password: '',
      passwordError: ''
    };
  },
  computed: {
    isFormValid() {
      return this.email && this.password;
    }
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.$router.push('/home');
        } else {
          this.error = data.message || 'Invalid credentials';
        }
      } catch (err) {
        this.error = 'An error occurred. Please try again.';
      }
    },
    redirectToSignup() {
      this.$router.push('/signup');
    }
  }
=======
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
>>>>>>> 14af949c98d4c1c45fbc907c83f47d2cccd64d10
};
</script>

<style scoped>
<<<<<<< HEAD
.form-container {
  background-color: rgba(243, 237, 232, 0.8);
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto;
}


.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error {
  color: red;
  font-size: 12px;
}
</style>
=======
</style>
>>>>>>> 14af949c98d4c1c45fbc907c83f47d2cccd64d10
