<template>
  <div class="fullCard">
    <ModalArticle
      v-model="modalOpen"
      :title="article.title"
      :subtitle="article.subtitle"
      :body="article.body"
      :tags="tags"
    />
    <a href="#" @click="openModal">
      <div class="border rounded-md pb-3 mb-5">
        <p class="text-xl sm:text-xl md:text-2xl lg:text-3xl text-green-500 pt-3 pb-3">{{ article.title }}</p>
        <p class="text-lg text-gray-800 pt-3 pb-3">{{ article.subtitle }}</p>
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="text-xs pt-3 pb-5"
          >· {{ tag }} //
        </span>
      </div>
    </a>
  </div>
</template>

<script>
import ModalArticle from "./modalArticleHome.vue";

export default {
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  components: {
    ModalArticle,
  },
  data() {
    return {
      tags: [],
      modalOpen: false,
    };
  },
  methods: {
    showAlert() {
      alert("Just a debug message");
    },
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
  },
  beforeMount() {
    this.tags = this.article.tags;
  },
};
</script>
<style scoped>
.fullCard {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.fullCard:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}
</style>
