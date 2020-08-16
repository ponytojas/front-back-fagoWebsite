<template>
  <div class="w-screen h-screen bg-yellow-400 absolute overflow-auto">
    <div class="flex justify-center align-middle h-full bg-yellow-400 relative">
      <div class="mt-12 h-full w-9/12 mb-12">
        <vue-editor
          v-model="content"
          class="bg-white"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      content: "<h1>Some initial content</h1>",
      file: "",
    };
  },
  methods: {
    handleImageAdded: function (file, Editor, cursorLocation) {
      console.log("Inserting image to server");
      this.file = file;

      let formData = new FormData();
      formData.append("editor-image", this.file); // appending file

      // sending file to the backend
      axios
        .post("http://localhost:3000/editor-images", formData)
        .then((res) => {
          console.log(res.data);
          let url = res.data;
          Editor.insertEmbed(
            cursorLocation,
            "image",
            "http://localhost:3000" + url
          );
          this.insertImageWidth(url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    insertImageWidth(fileUploaded) {
      console.log("Hola");
      console.log(this.content);
      this.content = this.content.replace(
        fileUploaded + '"',
        fileUploaded + '" width="500"'
      );
      console.log(this.content);
    },
  },
};
</script>

//Editor, cursorLocation, resetUploader
