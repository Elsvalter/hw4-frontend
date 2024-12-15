<template>
  <div>
    <h1>Add New Post</h1>
    <form @submit.prevent="addPost">
  
      <label for="content">Body:</label>
      <textarea id="content" v-model="content" required></textarea>

      <button type="submit">Add Post</button>
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
</style>
