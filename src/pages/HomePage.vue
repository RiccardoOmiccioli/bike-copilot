<script lang="js">
  import { defineComponent } from "vue";
  import router from "../router";
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
        <div class="info">
          <img src="/logo_dark_round.svg" alt="logo" id="logo">
          <div>
            <p>Welcome to Bike Copilot - a free tool developed by a passionate mountain biker to be your digital guide, providing the information you need during rides or route planning.
              Check the world using the provided maps designed for cycling and outdoor exploration.
              Stay informed with weather updates on temperature, wind, and more.
            </p>
          </div>
        </div>
        <filledButton @click="$router.push('/map')">Start</filledButton>
        <div class="info">
          <h2>Additional info</h2>
          <p>
            <span class="paragraph-container">
              Bike Copilot utilizes <a href="https://www.openstreetmap.org/about">OpenStreetMap</a> data, with map tiles provided by <a href="https://www.thunderforest.com/">Thunderforest</a>.
              Specifically, it employs <a href="https://www.thunderforest.com/maps/outdoors/">Thunderforest-Outoors</a> map tiles, the same tileset used by <a href="https://www.opencyclemap.org/">OpenCycleMap</a>.
              This ensures that the maps stay consistently up-to-date, benefiting from the continuous updates and contributions from the OpenStreetMap community.
            </span>
          </p>
        </div>
        <div class="info">
          <h2>Map usage</h2>
          <img src="../assets/image/dark_theme_info.svg" alt="dark theme map guide">
        </div>
        <filledButton @click="$router.push('/cookbook')">Cookbook</filledButton>
      </div>
  </main>
</template>

<style lang="scss">
  #logo {
    width: 3.583rem;
    height: 3.583rem;
  }

  .info-container {
    width: calc(100% - 2 * var(--gigantic));
    height: calc(100% - 2 * var(--gigantic));
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: var(--gigantic);
    gap: var(--gigantic);
    overflow: scroll;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--huge);
  }

  img {
    width: 100%;
    border-radius: var(--medium);
  }

  .paragraph-container {
    display: inline-block;
  }
</style>