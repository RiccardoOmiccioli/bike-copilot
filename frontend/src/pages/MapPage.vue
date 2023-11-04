<script lang="ts">
  import { defineComponent } from "vue";
  import mapComponent from "../components/mapComponent.vue";

  export default defineComponent({
    components: { mapComponent },
    methods:{
    },
    data() {
      return {
      };
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