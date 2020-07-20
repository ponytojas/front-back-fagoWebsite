<template>
  <div class="home">
    <div class="container h-screen">
      <div v-if="loaded" class="grid-cols-2">
        <autocomplete
          class="p-6 items-center"
          :search="search"
          placeholder="Busca un artículo"
          aria-label="Busca un artículo"
        />
      </div>
      <div class="grid grid-cols-3 gap-4 container mx-auto">
        <div v-for="article in articles" v-bind:key="article.article_id">
          <ArticleCard :article="article" class="pb-4 mb-3" />
        </div>
      </div>
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
import axios from "axios";
import ArticleCard from "../components/articlesCard";

export default {
  name: "Home",
  components: {
    Autocomplete,
    ArticleCard,
  },
  data() {
    return {
      loaded: false,
      articles: [],
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:3000/get-data-for-web/")
      .then((response) => {
        console.log(response.data);
        this.articles = response.data;
      });
    await this.$store
      .dispatch("articles", this.articles)
      .then(() => (this.loaded = true));
  },
  methods: {
    search(input) {
      console.log(this.articles);
      if (input.length < 1) {
        return [];
      }
      return this.articles.filter((article) => {
        return (
          article.title.toLowerCase().includes(input.toLowerCase()) ||
          article.subtitle.toLowerCase().includes(input.toLowerCase())
        );
      });
    },
  },
};
</script>
