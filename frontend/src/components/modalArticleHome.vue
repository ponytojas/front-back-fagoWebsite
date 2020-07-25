<template>
  <div class="modal-backdrop" v-show="value">
    <transition name="fade" v-show="value">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        v-show="value"
      >
        <header class="modal-header">
          <div id="modalTitle">
            <p
              name="header"
              class="text-base sm:text-xl md:text-2xl lg:text-3xl text-green-500"
            >
              {{ title }}
            </p>
          </div>
          <div class="modal-subtitle">
            <p name="header" class="text-base sm:text-lg text-gray-800">
              {{ subtitle }}
            </p>
          </div>
        </header>
        <section class="modal-body" id="modalDescription">
          <nl2br name="body" tag="p" :text="body" />
        </section>
        <footer class="modal-footer">
          <p name="footer"><b>Etiquetas:</b> {{ tags.join(" // ") }}</p>
          <p name="footer"><b>Autor:</b> {{ author }}</p>
          <p name="footer"><b>Última modificación:</b> {{ date }}</p>
        </footer>
        <button
          type="button"
          class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white py-2 my-4 px-4 rounded content-center self-center w-24"
          @click="close"
          aria-label="Close modal"
        >
          Cerrar
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import Nl2br from "vue-nl2br";

export default {
  name: "modal",
  components: {
    Nl2br,
  },
  props: {
    value: {
      required: true,
    },
    title: String,
    subtitle: String,
    body: String,
    tags: Array,
    author: String,
    date: String,
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
    },
    beforeMount() {
      this.$props.date = this.$props.date.slice(
        0,
        this.$props.date.indexOf("T")
      );
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  width: 85%;
  padding: 10px;
}

.modal-header,
.modal-footer,
modal-subtitle {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}
.modal-subtitle {
  justify-content: flex-start;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  text-align: justify;
  padding: 20px 10px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
