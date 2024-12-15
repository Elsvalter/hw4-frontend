<template>
  <div>
    <h1>Add New Post</h1>
    <form @submit.prevent="addPost">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="title" required />

      <label for="body">Body:</label>
      <textarea id="body" v-model="body" required></textarea>

      <button type="submit">Add Post</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      title: "",
      body: "",
    };
  },
  methods: {
    addPost() {
      fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: this.title,
          body: this.body,
        }),
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
