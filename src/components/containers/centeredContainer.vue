<script lang="js">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
            }
        },
        props: {
        },
        mounted() {
        },
        methods: {
        },
    });
</script>

<template>
    <div class="div">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .div {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
</style>