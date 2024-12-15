<template>
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

      <button type="submit" :disabled="!isFormValid">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      email: '',
      password: '',
      passwordError: ''
    };
  },
  computed: {
    isFormValid() {
      return this.email && this.password && !this.passwordError;
    }
  },
  methods: {
    validatePassword(password) {
      const passwordRegex = /^(?=[A-Z])(?=.*[A-Z])(?=.*[a-z].*[a-z])(?=.*\d)(?=.*_).{8,14}$/;
      if (!passwordRegex.test(password)) {
        this.passwordError = this.getPasswordError(password);
      } else {
        this.passwordError = '';
      }
    },
    getPasswordError(password) {
      if (password.length < 8 || password.length > 14) {
        return " Password is not valid - Password should be between 8 and 14 characters.";
      } else if (!/^[A-Z]/.test(password)) {
        return " Password is not valid - Password should include at least one uppercase letter and it should start with an uppercase alphabet.";
      } else if (!/[a-z].*[a-z]/.test(password)) {
        return " Password is not valid - Password should include at least two lowercase letters.";
      } else if (!/\d/.test(password)) {
        return " Password is not valid - Password should include at least one numeric digit.";
      } else if (!/_/g.test(password)) {
        return " Password is not valid - Password should include an underscore (_).";
      }
      return '';
    },
    async handleSubmit() {
      try {
        const response = await fetch('http://localhost:3000/auth/check-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email })
        });

        const data = await response.json();

        if (data.exists) {
          this.emailError = 'This email is already registered.';
          return;
        } else {
          this.emailError = '';
          // Proceed with signup
          const signupResponse = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.email, password: this.password })
            //credentials: 'include'
          });

          const signupData = await signupResponse.json();

          if (signupResponse.ok) {
            this.$router.push('/login');
          } else {
            console.error('Signup failed:', signupData.error);
          }
        }
      } catch (err) {
        console.error('Error occurred during signup:', err);
      }
    }
  },
  watch: {
    password(newPassword) {
      this.validatePassword(newPassword);
    }
  }
};
</script>

<style scoped>
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