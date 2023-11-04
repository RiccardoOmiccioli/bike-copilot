<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    components: {},
    methods:{
    },
  });
</script>

<template>
  <main>
      <h3>Bike Copilot homepage</h3>

      <button @click="$router.push('/mapPage')">Start</button>
  </main>
</template>

<style lang="scss">
</style>