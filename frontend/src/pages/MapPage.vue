<script lang="ts">
  import { defineComponent } from "vue";
  import mapComponent from "../components/mapComponent.vue";
  import islandContainer from "../components/containers/islandContainer.vue";
  import zoomLevelVisualizer from "../components/zoomLevelVisualizer.vue";
  import gpxImportComponent from "../components/gpxImportComponent.vue";
  import menuComponent from "../components/menuComponent.vue";

  export default defineComponent({
    components: { mapComponent, menuComponent, islandContainer, zoomLevelVisualizer, gpxImportComponent},
    data() {
      return {
      };
    },
    mounted() {
      this.emitter.on('toggleFullscreen', () => {
          this.toggleFullscreen();
      });
      try {
        navigator.wakeLock.request("screen");
      } catch(error) {
        console.log("Wake Lock not obtained");
      }
    },
    methods:{
      toggleFullscreen() {
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
      },
    },
  });
</script>

<template>
  <main>
    <mapComponent></mapComponent>
    <menuComponent class="menu"></menuComponent>
    <islandContainer class="main-island">
      <span class="material-symbols-outlined" @click="this.emitter.emit('changeMapView')">assistant_navigation</span>
      <span class="material-symbols-outlined" @click="this.emitter.emit('toggleMenu')">expand_circle_up</span>
      <gpxImportComponent></gpxImportComponent>
    </islandContainer>
    <div class="footer">
      <zoomLevelVisualizer></zoomLevelVisualizer>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100%;
  }

  .menu {
    z-index: 1;
  }

  .main-island {
    position: absolute;
    bottom: calc(3 * var(--micro));
    left: 50%;
    transform: translate(-50%);
    margin: 0;
  }

  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--micro);
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: var(--micro);
  }

  @media screen and (orientation: landscape) {
    .main-island {
      transform: unset;
      left: var(--micro);
    }

    div.island.main-island {
      flex-direction: column;
    }
  }
</style>