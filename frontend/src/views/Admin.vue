<template>
  <div class="container w-screen align-top h-screen p-16">
    <div class="bg-white border w-full rounded-lg p-6 align-top">
      <p class="text-4xl">Panel de administración</p>
      <hr class="w-3/4 m-auto mt-2" />
      <p class="text-2xl mt-8 pb-1">Control de usuario</p>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <AdminSetting
          icon="user-plus"
          text="Registrar usuario"
          color="text-green-600"
        />
        <AdminSetting
          icon="user-edit"
          text="Editar usuario"
          color="text-yellow-500"
        />
        <AdminSetting
          icon="user-slash"
          text="Eliminar usuario"
          color="text-red-500"
        />
      </div>
      <p class="text-2xl mt-8 pb-1">Control de artículos</p>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <AdminSetting
          icon="plus-circle"
          text="Crear artículo"
          color="text-blue-600"
        />
        <AdminSetting
          icon="edit"
          text="Editar artículo"
          color="text-orange-500"
        />
        <AdminSetting
          icon="newspaper"
          text="Revisar artículo"
          color="text-purple-500"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSetting from "../components/adminSetting";

export default {
  name: "Login",
  components: {
    AdminSetting,
  },
  data() {
    return {
      username: "",
      password: "",
      msg: "",
      loading: false,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
