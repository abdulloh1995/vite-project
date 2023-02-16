<template>
    <input class="form-control" type="text" :value="modelValue" @input="updateInput"/>
</template>

<script>
export default {
    name: "Input",
    props: {
        modelValue: [String, Number]
    }, 
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style>
    
</style>