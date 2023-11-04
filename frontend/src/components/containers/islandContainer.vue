<script lang="ts">
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
    <div class="island-container">
        <div class="island">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .island-container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: var(--huge);
        margin-right: var(--huge);
    }

    .island {
        width: fit-content;
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        gap: var(--medium);
        background-color: var(--neutral-000);
        border-radius: 100px;
        min-height: calc(var(--medium) * 2 + var(--large));
        padding-top: var(--micro);
        padding-bottom: var(--micro);
        padding-left: var(--medium);
        padding-right: var(--medium);
    }
</style>