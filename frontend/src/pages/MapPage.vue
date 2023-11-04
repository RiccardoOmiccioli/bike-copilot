<script lang="ts">
  import { defineComponent } from "vue";
  import router from "./router";
  import mapComponent from "../components/mapComponent.vue";

  export default defineComponent({
    components: { mapComponent },
    data() {
      return {
      };
    },
    methods:{
    },
  });
</script>

<template>
  <main>
    <mapComponent></mapComponent>
  </main>
</template>

<style lang="scss">
  #map {
    width: 100%;
    height: 100%;
  }
</style>