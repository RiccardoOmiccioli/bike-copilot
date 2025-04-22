<script lang="js">
  import { defineComponent } from "vue";
  import filledButton from "../components/buttons/filledButton.vue";
  import outlinedButton from "../components/buttons/outlinedButton.vue";
  import centeredContainer from "../components/containers/centeredContainer.vue";
  import islandContainer from "../components/containers/islandContainer.vue";
  import segmentedButton from "../components/buttons/segmentedButton.vue";
  import weatherComponent from "../components/weatherComponent.vue";
  import outlinedTextField from "../components/textFields/outlinedTextField.vue"

  export default defineComponent({
    components: { filledButton, outlinedButton, centeredContainer, islandContainer, segmentedButton, weatherComponent, outlinedTextField },
    data() {
      return {
        inputTextValue: "Default",
      };
    },
    methods:{
      handleTextField(value) {
        console.log(value);
        this.inputTextValue = "Changed";
      },
      handleTextField2(value) {
        console.log("2 " + value);
      }
    },
  });
</script>

<template>
  <main>
    <div class="cookbook-container">
      <centeredContainer>
        <filledButton @click="">Button</filledButton>
        <outlinedButton @click="">Button</outlinedButton>
      </centeredContainer>
      <centeredContainer>
        <outlinedTextField :inputValue="inputTextValue" @input-submit="handleTextField"></outlinedTextField>
      </centeredContainer>
      <centeredContainer>
        <outlinedTextField @input-submit="handleTextField2"></outlinedTextField>
      </centeredContainer>
      <islandContainer>
        <span class="material-symbols-outlined">satellite_alt</span>
        <div id="animated-width-div"></div>
        <span class="material-symbols-outlined">add_circle</span>
      </islandContainer>
      <segmentedButton :options="[
        {value: 'first', id: 'first', label: 'First'},
        {value: 'second', id: 'second', label: 'Second'},
        {value: 'third', id: 'third', label: 'Third'}
      ]" group-name="test-type"/>
      <weatherComponent></weatherComponent>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  @keyframes animated {
    0% { width: 0; }
    50% { width: 30rem; }
    100% { width: 0; }
  }

  .cookbook-container {
    width: 100%;
    height: 100%;
    padding-top: var(--gigantic);
    padding-bottom: var(--gigantic);
    padding-left: var(--large);
    padding-right: var(--large);
    display: flex;
    flex-direction: column;
    gap: var(--gigantic);
    overflow: scroll;
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