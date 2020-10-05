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
              class="text-xl sm:text-xl md:text-2xl lg:text-3xl text-green-500"
            >
              {{ title }}
            </p>
          </div>
          <div class="modal-subtitle">
            <p name="header" class="text-lg sm:text-lg text-gray-800">
              {{ subtitle }}
            </p>
          </div>
        </header>
        <section class="modal-body" id="modalDescription">
          <div v-html="body" />
        </section>
        <footer class="modal-footer">
          <div>
            <span
              v-for="(tag, index) in tags"
              :key="index"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >#{{ tag }}
            </span>
          </div>
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
export default {
  name: "modal",
  components: {},
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
  background: #fafafa;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 95%;
  padding: 10px;
}

@media (min-width: 769px) {
  .modal-body {
    padding: 20px 5% 0px 5% !important;
  }
  .modal-header {
    padding-left: 25px;
    padding-right: 25px;
  }
}

.modal-header,
modal-subtitle {
  padding-top: 10px;
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
  display: flex;
  border-top: 1px solid #eeeeee;
  justify-content: space-around;
  padding: 5px 10px 0px 10px;
  margin-bottom: -5px;
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
