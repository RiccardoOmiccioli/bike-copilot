<script lang="ts">
  import { defineComponent } from "vue";
  import router from "./router";
  import mapComponent from "../components/mapComponent.vue";
  import islandContainer from "../components/containers/islandContainer.vue";

  export default defineComponent({
    components: { mapComponent, islandContainer },
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
    <div class="footer">
      <island-container class="bottom-island">
        <span class="material-symbols-outlined">satellite_alt</span>
        <span class="material-symbols-outlined">add_circle</span>
      </island-container>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  #map {
    width: 100%;
    height: 100%;
  }

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: var(--large);
  }
</style>