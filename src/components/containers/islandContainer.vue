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
    <div class="island">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .island {
        width: fit-content;
        max-width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        gap: var(--medium);
        background-color: var(--neutral-000);
        border-radius: 100px;
        min-height: calc(var(--micro) * 2 + var(--large));
        padding-top: var(--micro);
        padding-bottom: var(--micro);
        padding-left: var(--micro);
        padding-right: var(--micro);
    }
</style>