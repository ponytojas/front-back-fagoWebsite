<template>
  <div class="home">
    <div class="container">
      <router-link class="m-5 p-5" to="/login">
        <button
          class="m-5 px-10 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full"
        >
          Login
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>
