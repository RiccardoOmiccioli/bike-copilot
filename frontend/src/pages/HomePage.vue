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
      <div class="info-container">
        <h1>Bike Copilot</h1>
        <div>
          <p>Welcome to Bike Copilot - a free tool developed by a dedicated mountain biker to be your digital guide, providing the information you need during rides or route planning.
            Check the world using the provided maps designed for cycling and outdoor exploration.
            Stay informed with real-time weather updates on temperature, wind speed, and more.
          </p>
        </div>
        <filledButton @click="$router.push('/map')">Start</filledButton>
        <div>
          <p>Bike Copilot utilizes </p><a href="https://www.openstreetmap.org/about">OpenStreetMap</a><p> data, with map tiles provided by </p><a href="https://www.thunderforest.com/">Thunderforest</a><p>.
            Specifically, it employs </p><a href="https://www.thunderforest.com/maps/outdoors/">Thunderforest-Outoors</a><p> map tiles, the same tileset used by </p><a href="https://www.opencyclemap.org/">OpenCycleMap</a><p>.
              This ensures that the maps stay consistently up-to-date, benefiting from the continuous updates and contributions from the OpenStreetMap community.
            </p>
          </div>
          <img src="../assets/image/dark_theme_info.svg" alt="dark theme map guide">
        </div>
        <filledButton @click="$router.push('/cookbook')">Cookbook</filledButton>
  </main>
</template>

<style lang="scss">
  .info-container {
    width: calc(100% - 2 * var(--gigantic));
    height: calc(100% - 2 * var(--gigantic));
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--gigantic);
    gap: var(--large);
    overflow: scroll;
  }

  img {
    width: 100%;
    border-radius: var(--medium);
  }

  p, a {
    display: inline;
  }
</style>