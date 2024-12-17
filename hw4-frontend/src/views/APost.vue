<template>
  <div class="APost">
    <div id="form">
      <h3>Update Post</h3>
      <label for="content">Body: </label>
      <textarea id="content" v-model="post.content" required></textarea>
      <div class="post-date">Posted on: {{ new Date(post.created_at).toLocaleString() }}</div>
    </div>
    <div>
      <button @click="updatePost" class="updatePost">Update Post</button>
      <button @click="deletePost" class="deletePost">Delete Post</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "APost",
  data() {
    return {
      post: {
        id: "",
        content: "",
        created_at: "",
      },
    };
  },
  methods: {
    fetchAPost(id) {
      fetch(`http://localhost:3000/api/posts/${id}`)
        .then((response) => response.json())
        .then((data) => (this.post = data))
        .catch((err) => console.log(err.message));
    },
    updatePost() {
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.post),
      })
        .then((response) => response.json())
        .then(() => {
          this.$router.push("/allposts"); // Redirect after update
        })
        .catch(() => {
          console.log("Error updating post");
        });
    },
    deletePost() {
      fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          this.$router.push("/allposts"); // Redirect after deletion
        })
        .catch(() => {
          console.log("Error deleting post");
        });
    },
  },
  mounted() {
    this.fetchAPost(this.$route.params.id);
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
