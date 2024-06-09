<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
                speedValue: 0,
                altitudeValue: 0,
                gradientValue: 0
            }
        },
        props: {
        },
        mounted() {
            this.emitter.on('positionChanged', (coords) => {
                this.speedValue = Math.round((coords.speed??0)/3.6);
                this.altitudeValue = Math.round(coords.altitude??0);
            });
        },
        methods: {
        },
    });
</script>

<template>
    <span class="ride-info"><p class="ride-info-value">{{speedValue}}</p><br><p class="unit">km/h</p></span>
    <span class="ride-info"><p class="ride-info-value">{{altitudeValue}}</p><br><p class="unit">m</p></span>
    <span class="ride-info"><p class="ride-info-value">{{gradientValue}}</p><br><p class="unit">%</p></span>
</template>

<style lang="scss" scoped>
  .ride-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    height: var(--gigantic);
    width: var(--gigantic);
    color: var(--neutral-080);
    line-height: 0;
  }

  .ride-info-value {
    font-size: var(--medium);
  }

  .unit {
    font-size: var(--tiny);
    color: var(--neutral-040);
  }
</style>