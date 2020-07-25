<template>
  <div class="home">
    <div class="h-auto min-h-screen overflow-x-hidden">
      <div class="bg-green-600 lg:h-64 md:h-56 sm:h-56 h-48">
        <div
          class="flex flex-row sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 container mx-auto text-center justify-center content-center align-middle"
        >
          <a href="#">
            <div class="flex-col">
              <div class="flex-row">
                <v-icon
                  class="pt-3 mx-10 text-gray-100 text-center align-middle"
                  scale="2"
                  name="info-circle"
                />
              </div>
              <div class="flex-row">
                <p class="text-white text-base">
                  About me
                </p>
              </div>
            </div>
          </a>
          <a href="#">
            <div class="flex-col">
              <div class="flex-row">
                <v-icon
                  class="pt-3 mx-10 text-gray-100 text-center align-middle"
                  scale="2"
                  name="file"
                />
              </div>
              <div class="flex-row">
                <p class="text-white text-base">
                  Curriculum
                </p>
              </div>
            </div>
          </a>
          <a href="#">
            <div class="flex-col">
              <div class="flex-row">
                <v-icon
                  class="pt-3 mx-10 text-gray-100 text-center align-middle"
                  scale="3"
                  name="graduation-cap"
                />
              </div>
              <div class="flex-row">
                <p class="text-white text-base">
                  Final degree project
                </p>
              </div>
            </div>
          </a>
        </div>
        <p
          class="text-center h-full align-middle text-white text-4xl lg:text-5xl xl:text-6xl font-hairline pt-8"
        >
          FagoLambda
        </p>
      </div>
      <div
        v-if="loaded"
        class="flex flex-row align-middle justify-center h-auto"
      >
        <autocomplete
          class="w-1/2 sm:w-1/2 md:w-1/3 xl:w-1/3 lg:w-1/3 rounded-md mb-6"
          :search="search"
          placeholder="Busca un artículo"
          aria-label="Busca un artículo"
          style="
            margin-top: -3vh;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
              0 6px 6px rgba(0, 0, 0, 0.23) !important;
          "
        />
      </div>
      <div
        class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 container mx-auto"
      >
        <div v-for="article in articles" v-bind:key="article.article_id">
          <ArticleCard :article="article" class="" />
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
