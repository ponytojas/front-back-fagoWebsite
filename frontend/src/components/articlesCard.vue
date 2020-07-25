<template>
  <div>
    <ModalArticle
      v-model="modalOpen"
      :title="article.title"
      :subtitle="article.subtitle"
      :body="article.body"
    />
    <a href="#" @click="openModal">
      <div class="border rounded-md pb-3 mb-5">
        <p class="text-xl pt-3 pb-3">{{ article.title }}</p>
        <p class="text-xl pt-3 pb-3">{{ article.subtitle }}</p>
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
