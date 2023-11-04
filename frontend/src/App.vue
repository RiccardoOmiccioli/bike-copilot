<script lang="ts">
  import { defineComponent } from "vue";
  import router from "./router";

  export default defineComponent({
    components: {},
    mounted() {
      router.replace({ name: "home" });
    }
  });
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
</style>
