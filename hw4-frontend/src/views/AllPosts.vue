<template>
  <div class="AllPosts">
    <button @click="logout">Logout</button>
    <div id="post-list">
      <h1>All Posts</h1>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <a :href="'/api/apost/' + post.id">
            <span class="id">{{ post.id }}</span>
          </a>
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
      this.$router.push('/login');
    },
    deleteAllPosts() {
      fetch('http://localhost:3000/api/posts', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then(() => {
          this.fetchPosts();
        })
        .catch(error => console.error('Delete all error:', error));
    },
    addPost() {
      this.$router.push('/addpost');
    },
  },
  mounted() {
    if (!this.isUserLoggedIn) {
      this.$router.push('/login');
    } else {
      this.fetchPosts();
      console.log("mounted")
    }
  },
};
</script>

<style scoped>
.post {
  background-color: rgba(243, 237, 232, 0.847);
  border-radius: 7px;
  margin-bottom: 20px;
  padding: 8px;
  width: 430px;
  border: 1px solid #000;
}

</style>
