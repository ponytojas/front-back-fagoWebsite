<template>
  <div class="home">
    <div class="h-auto min-h-screen overflow-x-hidden">
      <div class="bg-green-600 lg:h-64 md:h-56 sm:h-56 h-48">
        <div
          class="flex flex-col sm:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-12 mx-auto text-center justify-center"
        >
          <div class="flex flex-wrap container">
            <a class="w-1/3" href="#">
              <v-icon
                class="pt-3 mx-10 text-gray-100 text-center align-middle"
                scale="2"
                name="info-circle"
              />
              <p class="text-white text-base">
                About me
              </p>
            </a>
            <a class="w-1/3" href="#">
              <v-icon
                class="pt-3 mx-10 text-gray-100 text-center align-middle"
                scale="2"
                name="file"
              />

              <p class="text-white text-base">
                Curriculum
              </p>
            </a>
            <a class="w-1/3" href="#">
              <v-icon
                class="pt-3 mx-10 text-gray-100 text-center align-middle"
                scale="3"
                name="graduation-cap"
              />

              <p class="text-white text-base">
                Final degree project
              </p>
            </a>
          </div>
          <div class="justify-center flex-row">
            <p
              class="text-center h-full align-middle text-white text-4xl lg:text-5xl xl:text-6xl font-hairline pt-8"
            >
              FagoLambda
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="loaded"
        class="flex flex-row align-middle justify-center h-auto"
      >
        <autocomplete
          class="w-1/2 sm:w-1/2 md:w-1/3 xl:w-1/3 lg:w-1/3 rounded-md mb-6 searchbar text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
          :search="search"
          @submit="handleSubmit"
          placeholder="Busca un artículo"
          ref="autocomplete"
          aria-label="Busca un artículo"
          style="
            margin-top: -3vh;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
              0 6px 6px rgba(0, 0, 0, 0.23) !important;
          "
        />
      </div>
      <div
        v-if="loaded"
        class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 container mx-auto"
      >
        <div v-for="article in articles" v-bind:key="article.article_id">
          <ArticleCard :article="article" class="" :ref="article.article_id" />
        </div>
      </div>
      <div
        v-if="!loaded"
        class="flex flex-row align-middle justify-center h-auto pt-12 pb-24"
      >
        <PacmanLoader color="#38a169" :size="64" margin="5" v-if="!loaded" />
      </div>
      <div
        v-if="!loaded"
        class="flex flex-row align-middle justify-center h-auto pt-12 pb-24"
      >
        <p class="text-3xl">Cargando artículos</p>
      </div>
      <router-link class="m-5 p-5" to="login">
        <button
          class="m-5 px-10 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full"
        >
          Login
        </button>
      </router-link>
      <button
        class="m-5 px-10 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full"
        @click="reset"
      >
        Logout
      </button>
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
      titles: [],
      nertworkError: false,
    };
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      await axios
        .get("http://localhost:3000/get-data-for-web/", { timeout: 3500 })
        .then(async (response) => {
          this.articles = await JSON.parse(JSON.stringify(response.data));
          await this.$store
            .dispatch("articles", this.articles)
            .then(() => (this.loaded = true));
        })
        .catch((err) => {
          if (err.code == "ECONNABORTED") {
            this.getArticles;
          } else if (err.message == "Network Error") {
            if (!this.nertworkError) {
              setTimeout(() => {
                this.$toasted.show(
                  "Estamos experimentando algunos problemas, lamentamos las molestias, seguimos intentando carga el contenido",
                  {
                    theme: "outline",
                    position: "bottom-center",
                    duration: 15000,
                    keepOnHover: true,
                  }
                );
              }, 2000);
              this.nertworkError = true;
            } else this.sleep(2000).then(() => this.getArticles);
          } else {
            console.log(err.code);
            console.log(err.message);
            console.log(err);
          }
        });
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    reset() {
      this.$store.dispatch("logout");
    },
    search(input) {
      if (input.length < 1) {
        return [];
      }
      return this.articles
        .filter((article) => {
          return (
            article.title.toLowerCase().includes(input.toLowerCase()) ||
            article.subtitle.toLowerCase().includes(input.toLowerCase()) ||
            article.tags.find((el) => el.toLowerCase().includes(input))
          );
        })
        .map(
          (article) =>
            "Título: " + article.title + "  /  Subtítulo: " + article.subtitle
        );
    },
    handleSubmit(result) {
      let title = result.substring(
        result.indexOf(":") + 2,
        result.lastIndexOf("  /")
      );

      let selectedID = this.articles
        .filter((el) => el.title == title)
        .map((el) => el.article_id)[0];
      this.$refs[selectedID][0].openModal();
      this.$refs.autocomplete.value = "";
    },
  },
};
</script>

<style scoped>
.searchbar {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23) !important;
}
.toasted {
  background-color: #38a169 !important;
  color: #38a169 !important;
}
.bubble {
  background-color: #38a169 !important;
  color: #38a169 !important;
}
</style>
