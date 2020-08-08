<template>
  <div class="w-screen h-screen bg-yellow-400 absolute overflow-auto">
    <div class="flex justify-center align-middle h-full bg-yellow-400 relative">
      <div class="mt-12 h-full w-9/12 mb-12">
        <vue-editor v-model="content" class="bg-white" />
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Axios from "axios";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
    };
  },
  methods: {
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      Axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData,
      })
        .then((result) => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
