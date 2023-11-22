<script lang="ts">
  import { defineComponent } from "vue";
  import mapComponent from "../components/mapComponent.vue";
  import islandContainer from "../components/containers/islandContainer.vue";
  import zoomLevelVisualizer from "../components/zoomLevelVisualizer.vue";
  import menuComponent from "../components/menuComponent.vue";

  export default defineComponent({
    components: { mapComponent, menuComponent, islandContainer, zoomLevelVisualizer },
    data() {
      return {
      };
    },
    mounted() {
      this.emitter.on('toggleFullscreen', () => {
          this.toggleFullscreen();
      });
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
    <div class="footer">
      <islandContainer class="bottom-island">
        <span class="material-symbols-outlined">assistant_navigation</span>
        <span class="material-symbols-outlined" @click="this.emitter.emit('toggleMenu')">expand_circle_up</span>
        <span class="material-symbols-outlined">add_circle</span>
      </islandContainer>
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
</style>