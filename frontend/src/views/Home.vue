<template>
  <div class="home">
    <div class="container h-screen">
      <autocomplete
        class="p-6 max-w-2xl"
        :search="search"
        placeholder="Busca un artículo"
        aria-label="Busca un artículo"
      />
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
import Autocomplete from "@trevoreyre/autocomplete-vue";

export default {
  name: "Home",
  components: {
    Autocomplete,
  },
  mounted() {},
  
};
</script>
