<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
                speedValue: 0,
                altitudeValue: 0,
                gradientValue: 0,
                initialAlpha: 0,
                initialBeta: 0,
                initialGamma: 0,
                currentAlpha: null as number | null,
                currentBeta: null as number | null,
                currentGamma: null as number | null
            }
        },
        props: {
        },
        mounted() {
            window.addEventListener('deviceorientation', this.handleOrientation);
            this.emitter.on('positionChanged', this.handlePositionChange);
        },
        methods: {
            resetOrientation() {
                this.initialAlpha = this.currentAlpha??0;
                this.initialBeta = this.currentBeta??0;
                this.initialGamma = this.currentGamma??0;
                this.gradientValue = 0;
            },
            handleOrientation(event: DeviceOrientationEvent) {
                this.currentAlpha = event.alpha ?? 0;
                this.currentBeta = event.beta ?? 0;
                this.currentGamma = event.gamma ?? 0;
                let gradient;
                if (screen.orientation.angle === 90) {
                    gradient = Math.tan(-(this.currentGamma - this.initialGamma) * (Math.PI / 180)) * 100;
                } else if (screen.orientation.angle === -90) {
                    gradient = Math.tan((this.currentGamma - this.initialGamma) * (Math.PI / 180)) * 100;
                } else {
                    gradient = Math.tan((this.currentBeta - this.initialBeta) * (Math.PI / 180)) * 100;
                }
                this.gradientValue = Math.max(-999, Math.min(999, Math.round(gradient)));
            },
            handlePositionChange(coords: { speed?: number, altitude?: number }) {
                this.speedValue = Math.round((coords.speed ?? 0) * 3.6);
                this.altitudeValue = Math.round(coords.altitude ?? 0);
            }
        },
    });
</script>

<template>
    <span class="ride-info"><p class="ride-info-value">{{speedValue}}</p><br><p class="unit">km/h</p></span>
    <span class="ride-info"><p class="ride-info-value">{{altitudeValue}}</p><br><p class="unit">m</p></span>
    <span class="ride-info" @click="resetOrientation"><p class="ride-info-value">{{gradientValue}}</p><br><p class="unit">%</p></span>
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