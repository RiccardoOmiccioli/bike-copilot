<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
            }
        },
        props: {
            onClick: {
                type: Function,
                required: true
            }
        },
        mounted() {
        },
        methods: {
        },
    });
</script>

<template>
    <button class="button" @click=this??onClick>
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    .button {
        box-sizing: border-box;
        background-color: transparent;
        padding-top: var(--micro);
        padding-bottom: var(--micro);
        padding-left: var(--medium);
        padding-right: var(--medium);
        border: solid 3px;
        border-color: var(--primary-030);
        border-radius: 100px;
        font-size: large;
        color: var(--primary-090);
    }
</style>