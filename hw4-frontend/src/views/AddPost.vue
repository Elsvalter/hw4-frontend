<template>
  <div id ="form">
    <h3>Add New Post</h3>
    <form @submit.prevent="addPost">
  
      <label for="content">Body:</label>
      <textarea id="content" v-model="content" required></textarea>

      <button class="button" type="submit">Add Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      content: ""
    };
  },
  methods: {
    addPost() {
      var data = {
        content: this.content
      };
      fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(() => {
          this.$router.push('/allposts');
        })
        .catch(err => console.error('Error adding post:', err));
    },
  },
};
</script>

<style scoped>
#form {
  max-width: 420px;
  margin: 30px auto;
  background: rgba(243, 237, 232, 0.847);
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}

h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}

label {
  color: rgb(8, 110, 110);
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

textarea {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: blue;
  min-height: 200px;
}

.post-date {
  margin-top: 10px;
  color: gray;
  font-size: 0.8em;
}

button {
  background: rgb(8, 110, 110);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

button:hover {
  background: rgb(12, 150, 150);
}

</style>
