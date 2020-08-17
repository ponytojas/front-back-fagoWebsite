<template>
  <div class="flex justify-center align-middle h-screen bg-yellow-400">
    <AdminModal
      v-model="articleModal"
      title="Exameple"
      subtitle="Example"
      author="Example"
      date="Example"
    />
    <div
      class="self-center w-11/12 lg:w-9/12 h-auto py-12 px-12 card border-gray-500 rounded-lg"
    >
      <p class="text-4xl">Panel de administración</p>
      <hr class="w-3/4 m-auto mt-2" />
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-1">
          <p class="text-2xl mt-8 pb-1">Control de usuario</p>
          <div class="grid grid-cols-3 gap-4 mt-5 col-span-3">
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="person_add"
                text="Registrar usuario"
                color="text-green-600"
              />
            </div>
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="admin_panel_settings"
                text="Editar usuario"
                color="text-pink-500"
              />
            </div>
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="person_remove"
                text="Eliminar usuario"
                color="text-red-500"
              />
            </div>
          </div>
        </div>
        <div class="row-span-1">
          <hr class="w-3/4 m-auto mt-2" />
          <p class="text-2xl mt-8 pb-1">Gestión de artículos</p>
          <div class="grid grid-cols-3 gap-4 mt-5 col-span-3">
            <div class="grid grid-rows-1 gap-2">
              <a @click="goToEditor('')" class="cursor-pointer">
                <AdminSetting
                  icon="create"
                  text="Crear artículo"
                  color="text-blue-600"
                />
              </a>
            </div>
            <div class="grid grid-rows-1 gap-2">
              <a @click="openModal(true)" class="cursor-pointer">
                <AdminSetting
                  icon="rate_review"
                  text="Editar artículo"
                  color="text-orange-500"
                />
              </a>
            </div>
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="preview"
                text="Revisar artículo"
                color="text-purple-500"
              />
            </div>
          </div>
        </div>
        <div class="row-span-1 align-bottom self-end">
          <button
            class="shadow bg-green-500 hover:bg-green-400 sm:text-lg xl:text-xl focus:outline-none text-white py-1 px-2 sm:py-1 sm:px-2 xl:py-2 xl:px-4 rounded"
            @click="reset"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSetting from "../components/adminSetting";
import AdminModal from "../components/adminModal";

export default {
  name: "Admin",
  components: {
    AdminSetting,
    AdminModal,
  },
  data() {
    return {
      articleModal: false,
      userModal: false,
      articles: [],
    };
  },
  async mounted() {
    this.articles = await this.$store.getters.getArticles;
  },

  methods: {
    goToEditor(article_id) {
      if (article_id)
        this.$router.push({
          name: "editor",
          params: { article_id: article_id },
        });
      else this.$router.push("editor");
    },

    openModal(article) {
      if (article) this.articleModal = !this.articleModal;
      else this.userModal = !this.userModal;
    },

    reset() {
      this.$store.dispatch("logout").then(() => this.$router.push("/"));
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fafafa;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
