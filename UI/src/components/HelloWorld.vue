<template>
  <div class="hello">
    <h1>Happy counting!</h1>
    <p style="font-size: 40px">{{ count }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => {
    return { count: 0 };
  },
  mounted: async function () {
    await this.loadCount();
  },
  methods: {
    loadCount: async function () {
      let result = await axios.get("http://127.0.0.1:3000");
      console.log(result.data.posts);
      this.count = result.data.posts
    },
  },
};
</script>