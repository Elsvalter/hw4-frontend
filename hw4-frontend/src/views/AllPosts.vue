<template>
  <div class="AllPosts">
    <button @click="logout">Logout</button>
    <div id="post-list">
      <h1>All Posts</h1>
      <ul>
        <div class="post-item" v-for="post in posts" :key="post.id">
          <div class="post-box" @click="goToPost(post.id)">
            <div class="post-content">
              <p>{{ post.content }}</p>
              <span class="post-date">{{ new Date(post.created_at).toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </ul>
    </div>
    <button @click="deleteAllPosts">Delete All</button>
    <button @click="addPost">Add Post</button>
  </div>
</template>

<script>
export default {
  name: "AllPosts",
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    isUserLoggedIn() {
      return !!localStorage.getItem("token");
    },
  },
  methods: {
    fetchPosts() {
      fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => (this.posts = data))
        .catch(err => console.error('Error fetching posts:', err));
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
    goToPost(postId) {
      this.$router.push(`/api/apost/${postId}`);
    },
    deleteAllPosts() {
      fetch('http://localhost:3000/api/posts', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to delete posts: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          console.log("All posts deleted:", data);
          this.fetchPosts(); // Refresh the posts list
        })
        .catch(error => {
          console.error("Delete all error:", error);
          alert("Failed to delete all posts. Please try again.");
        });
    },
    addPost() {
      this.$router.push('/addpost');
    },
  },
  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/');
    } else {
      this.fetchPosts();
    }
  },
};
</script>

<style scoped>
.post-item {
  margin-bottom: 20px;
}

.post-box {
  background-color: rgba(243, 237, 232, 0.847);
  border-radius: 7px;
  padding: 15px;
  width: 430px;
  border: 1px solid #000;
  position: relative;
  cursor: pointer; /* Muudab kursorit, et see oleks klikitav */
}

.post-content {
  margin-bottom: 10px;
}

.post-date {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.8em;
  color: gray;
}

.post-box:hover {
  background-color: rgba(0, 166, 249, 0.2); /* Hover efekti lisamine */
}
</style>
