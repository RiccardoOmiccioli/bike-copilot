<script lang="js">
    import {defineComponent} from "vue";

    export default defineComponent({
        data() {
            return {
                selectedOption: null,
            }
        },
        props: {
            options: {
                type: Array,
                required: true,
            },
            groupName: {
                type: String,
                default: "group-name",
            },
            emitterEvent: {
                type: String,
                default: "segmentedButtonEvent"
            },
            defaultCheckedIndex: {
                type: Number,
                default: 0,
            },
        },
        mounted() {
        },
        methods: {
            handleRadioChange() {
                this.emitter.emit(this.emitterEvent, this.selectedOption)
            },
        },
    });
</script>

<template>
    <div class="controls">
        <div v-for="(option, index) in options">
            <input
                :key="index"
                type="radio"
                :name="groupName"
                :value="option.value"
                :id="option.id"
                :checked="index === defaultCheckedIndex"
                v-model="selectedOption"
                @change="handleRadioChange"
            />
            <label :key="index" :for="option.id">
              {{ option.label }}
            </label>
        </div>
  </div>
</template>

<style lang="scss" scoped>
    .controls {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background-color: transparent;
        height: calc(var(--large) + 2 * var(--micro) + 2 * 3px);
    }

    .controls div:first-of-type label {
        border-radius: 100px 0 0 100px;
    }

    .controls div:last-of-type label {
        border-radius: 0 100px 100px 0;
    }

    .controls div:not(:first-of-type):not(:last-of-type) label {
        border-width: 3px 0 3px 0;
    }

    input {
        display: none;
    }

    label {
        box-sizing: border-box;
        background-color: transparent;
        padding-top: var(--micro);
        padding-bottom: var(--micro);
        padding-left: var(--medium);
        padding-right: var(--medium);
        border: solid 3px;
        border-color: var(--primary-030);
        font-size: large;
        color: var(--primary-090);
    }

    .controls div input[type="radio"]:checked + label {
        background-color: var(--primary-030);
    }
</style>