<script lang="ts">
  import { defineComponent } from "vue";
  import filledButton from "../components/buttons/filledButton.vue";
  import outlinedButton from "../components/buttons/outlinedButton.vue";
  import centeredContainer from "../components/containers/centeredContainer.vue";
  import islandContainer from "../components/containers/islandContainer.vue";

  export default defineComponent({
    components: { filledButton, outlinedButton, centeredContainer, islandContainer },
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
    <centeredContainer id="buttons-container">
      <filledButton @click="">Button</filledButton>
      <outlinedButton @click="">Button</outlinedButton>
    </centeredContainer>
    <islandContainer id="island-container">
      <span class="material-symbols-outlined">satellite_alt</span>
      <div id="animated-width-div"></div>
      <span class="material-symbols-outlined">add_circle</span>
    </islandContainer>
  </main>
</template>

<style lang="scss" scoped>
  @keyframes animated {
    0% { width: 0; }
    50% { width: 30rem; }
    100% { width: 0; }
  }

  #buttons-container {
    margin-top: var(--medium);
  }

  #island-container {
    margin-top: var(--medium);
  }

  #animated-width-div {
    height: calc(var(--medium) * 2 + var(--large) - var(--micro) * 2);
    border-radius: 100px;
    background-color: var(--neutral-005);
    animation-name: animated;
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }

  .material-symbols-outlined {
    font-size: calc(var(--medium) * 2 + var(--large) - var(--micro) * 2);
  }
</style>