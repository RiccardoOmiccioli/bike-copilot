<script lang="js">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
                inputText: "",
            }
        },
        props: {
            inputValue: String,
        },
        mounted() {
            this.inputText = this.inputValue?? "";
        },
        methods: {
            handleEnter() {
                this.$emit("input-submit", this.inputText);
            },
        },
        watch: {
            inputValue(newValue) {
                this.inputText = newValue;
            },
        },
    });
</script>

<template>
    <input type="text" v-model=inputText @keyup.enter="handleEnter" class="outlined-text-field"/>
</template>

<style lang="scss" scoped>
    .outlined-text-field {
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