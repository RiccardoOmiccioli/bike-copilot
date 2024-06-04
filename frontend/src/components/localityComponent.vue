<script lang="ts">
    import {defineComponent} from "vue";
    import outlinedTextField from "./textFields/outlinedTextField.vue";
    import axios from "axios";

    export default defineComponent({
        components: { outlinedTextField },
        data() {
            return {
                city: "",
                countryName: "",
            }
        },
        props: {
        },
        mounted() {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`).then(response => {
                        this.city = response.data.city;
                        this.countryName = response.data.countryName;
                    });
            });
        },
        methods: {
            searchLocality(value: String) {
                this.emitter.emit('localitySearched', value);
            }
        },
    });
</script>

<template>
    <outlinedTextField :inputValue="`${city}`" @input-submit="searchLocality" class="locality-text-field"></outlinedTextField>
</template>

<style lang="scss" scoped>
    .locality-text-field {
        width: calc(100% - 2 * var(--large));
    }
</style>