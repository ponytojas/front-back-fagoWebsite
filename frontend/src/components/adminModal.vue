<template>
  <div class="modal-backdrop" v-show="value">
    <transition name="fade" v-show="value">
      <div
        class="modal w-1/3"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
        v-show="value"
      >
        <section class="modal-body" id="modalDescription">
          <div v-for="article in articles" :key="article.title">
            <a @click="goToEditor(article)" style="cursor: pointer">
              <p>{{ article.title }}</p>
            </a>
          </div>
        </section>

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
    articles: {
      required: true,
      default: [],
    },
  },

  data() {
    return {};
  },

  methods: {
    close() {
      this.$emit("input", !this.value);
    },

    goToEditor(article) {
      console.log(article);
      this.$router.push({
        name: "Editor",
        params: { selected_article: article },
      });
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
