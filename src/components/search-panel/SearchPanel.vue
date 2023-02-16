<template>
<Input class="search-input" placeholder="Kinolarni qidirish" v-model="term" @input="changeInputHandler" />
</template>
<script>
export default {
    props: {
        updateTermHandler: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            term: ''
        }
    },
    methods: {
        changeInputHandler(e) {
            this.term = e.target.value
            this.updateTermHandler(this.term)
        }
    }
}
</script>
<style scoped>
    .search-input {
    margin-bottom: 1rem;
    padding: 1.5rem;
    background-color: #fcfcf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
    }
</style>