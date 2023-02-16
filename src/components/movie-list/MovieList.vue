<template>
    <ul class="movie-list list-group">
        <MovieListItem v-for="movie in movies" :movie="movie" :key="movie.id" 
        @onLike="$emit('onLike', movie.id)"
        @onFavourite="$emit('onFavourite', movie.id)"
        @onRemove="$emit('onRemove', $event)"/>
    </ul>
</template>
<script>
import MovieListItem from '../movie-list-item/MovieListItem.vue';

export default {
    components: { MovieListItem },
    props: {
        movies: {
            type: Array,
            required: true
        }
    }
}
</script>
<style scoped>

</style>