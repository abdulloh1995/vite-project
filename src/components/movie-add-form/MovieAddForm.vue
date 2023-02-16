<template>
    <Box>
        <h3>Yangi kino qoshish</h3>
        <form class="add-form d-flex" action="" @submit.prevent>
        <Input class="new-movie-label" placeholder="Qanday kino?" v-model="name" />
        <Input class="new-movie-label" type="number" placeholder="Nechi marotaba ko'rilgan?" v-model="viewers" />

        <PrimaryButton class="btn-outline-dark" type="submit" @click="addMovie">Qo'shish</PrimaryButton>
    </form>
</Box>
</template>
<script>

export default {
    data() {
        return {
            name: "",
            viewers: ""
        };
    },
    methods: {
        addMovie() {
            if (!this.name || !this.viewers)
                return;
            const newMovie = {
                name: this.name,
                viewers: this.viewers,
                favourite: false,
                like: false
            };
            this.$emit("crateMovie", newMovie);
            this.name = "";
            this.viewers = "";
        }
    },
}
</script>
<style scoped>
    /* .movie-add-form{
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfcf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
    } */
</style>