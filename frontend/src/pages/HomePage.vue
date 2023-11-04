<script lang="ts">
  import { defineComponent } from "vue";
  import router from "./router";
  import filledButton from "../components/buttons/filledButton.vue";

  export default defineComponent({
    components: { filledButton },
    data() {
      return {
        isFullscreen: false,
      };
    },
    methods:{
      fullscreen() {
        var body = document.querySelector("body");
        if(this.isFullscreen) {
          if (body.exitFullscreen) {
            body.exitFullscreen();
          }
          this.isFullscreen = false;
        } else {
          body.requestFullscreen();
          this.isFullscreen = true;
        }

      }
    },
  });
</script>

<template>
  <main>
      <h3>Bike Copilot homepage</h3>

      <filledButton @click="$router.push('/map')">Start</filledButton>
      <filledButton @click=fullscreen()>Fullscreen</filledButton>
      <filledButton @click="$router.push('/cookbook')">Cookbook</filledButton>
  </main>
</template>

<style lang="scss">
</style>