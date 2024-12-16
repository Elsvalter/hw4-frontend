<template>
  <div class="AllPosts">
    <button @click="logout">Logout</button>
    <div id="post-list">
      <h1>All Posts</h1>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <router-link :to="'/apost' + post.id">
            <span class="title">{{ post.title }}</span>
          </router-link>
        </div>
      </ul>
    </div>
    <div class="footer">
      <button @click="goToHome">Home</button>
      <button @click="goToContacts">Contacts</button>
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
    goToHome() {
      
      this.$router.push('/allposts');
    },
    goToContacts() {
      this.$router.push('/contact');
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
      this.$router.push('/');
    } else {
      this.fetchPosts();
    }
  },
};
</script>

<style scoped>
</style>
