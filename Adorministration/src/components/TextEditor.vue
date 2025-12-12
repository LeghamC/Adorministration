<template>
    <div class="text-editor">
        <input v-if="!isMultiline" type="text" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" class="text-input" placeholder="Enter the description of the intervention needed..." />

        <textarea v-else :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="text-area"
            placeholder="Write your intervention content here..." rows="5"></textarea>
    </div>
</template>

<script>
export default {
    name: "TextEditor",
    props: {
        modelValue: {
            type: String,
            required: true,
        },
        isMultiline: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.text-input,
.text-area {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 1em;
    font-family: inherit;
    transition: border-color 0.2s;
}

.text-input:focus,
.text-area:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 3px rgba(0, 119, 204, 0.3);
}
</style>