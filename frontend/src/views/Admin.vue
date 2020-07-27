<template>
  <div class="flex justify-center align-middle h-screen">
    <div
      class="self-center w-11/12 lg:w-9/12 h-auto py-12 px-12 card border-gray-500 border rounded-sm"
    >
      <p class="text-4xl">Panel de administración</p>
      <hr class="w-3/4 m-auto mt-2" />
      <div class="grid grid-rows-3 grid-flow-col gap-4">
        <div class="row-span-1">
          <p class="text-2xl mt-8 pb-1">Control de usuario</p>
          <div class="grid grid-cols-3 gap-4 mt-5 col-span-3">
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="user-plus"
                text="Registrar usuario"
                color="text-green-600"
              />
            </div>
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="user-edit"
                text="Editar usuario"
                color="text-yellow-500"
              />
            </div>
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="user-slash"
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
              <AdminSetting
                icon="plus-circle"
                text="Crear artículo"
                color="text-blue-600"
              />
            </div>
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="edit"
                text="Editar artículo"
                color="text-orange-500"
              />
            </div>
            <div class="grid grid-rows-1 gap-2">
              <AdminSetting
                icon="newspaper"
                text="Revisar artículo"
                color="text-purple-500"
              />
            </div>
          </div>
        </div>
        <div class="row-span-1 align-bottom self-end">
          <button
            class="m-5 px-10 py-2 bg-green-500 hover:bg-green-700 text-white rounded-full"
            @click="reset"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSetting from "../components/adminSetting";
export default {
  name: "Admin",
  components: {
    AdminSetting,
  },
  data() {
    return {};
  },
  methods: {
    beforeMount() {
      console.log(`this.$el doesn't exist yet, but it will soon!`);
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
