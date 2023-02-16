<template>
  <div class="app font-monospace">
    <div class="content">
      <AppInfo :allMoviesCount="movies.length" 
      :favouriteMoviesCount="movies.filter(c => c.favourite).length"/>
      <div class="search-pannel">
          <SearchPanel :updateTermHandler="updateTermHandler" />
          <AppFilter :updateFilterHandler="updateFilterHandler" :filterName="filter"/> 
      </div>

      <Box v-if="!movies.length && !isLoading">
        <p class="text-center fs-3 text-danger">Kinolar yo'q</p>
      </Box>

      <Box v-else-if="isLoading" class="d-flex justify-content-center">
        <Loader/>
      </Box>

      <Box v-else class="d-flex flex-column justify-content-center align-items-center">
        <MovieList  :movies="onFilterHandler(onSearchHandler(movies, term), filter)" 
        @onLike="onLikeHandler" 
        @onFavourite="onFavouriteHandler" 
        @onRemove="onRemoveHandler" />
        <nav class="mt-3" aria-label="...">
          <ul class="pagination pagination-sm pe-auto">
            <li v-for="pageNumber in totalPages" :key="pageNumber" :class="{'active': pageNumber === page}" @click="pageChangeHandler(pageNumber)">
              <span class="page-link text-dark m-1" :class="{'text-white': pageNumber === page}">{{ pageNumber }}</span>
            </li>
          </ul>
        </nav>
      </Box>


      <MovieAddForm @crateMovie="crateMovie" />

    </div>
  </div>
  
</template>

<script>
  import AppInfo from '@/components/app-info/AppInfo.vue'
  import SearchPanel from '@/components/search-panel/SearchPanel.vue'
  import AppFilter from '@/components/app-filter/AppFilter.vue';
  import MovieList from '@/components/movie-list/MovieList.vue'
  import MovieAddForm from '@/components/movie-add-form/MovieAddForm.vue'
  import axios from 'axios'

  export default {
    components: {
    AppInfo,
    SearchPanel,
    AppFilter,
    MovieList,
    MovieAddForm
},
  data() {
          return {
              movies: [],
              term: "",
              filter: 'all',
              isLoading: false,
              limit: 10,
              page: 1,
              totalPages: 0
          }
      },
      methods: {
        async crateMovie (item) {
          try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', item)
            this.movies.push(response.data)
          } catch (error) {
            alert(error.message)
          }

        },
        onLikeHandler(id) {
          this.movies.map(item => {
            if (item.id === id) {
              item.like = !item.like
            }
            return item
          })
        },
        onFavouriteHandler(id) {
          this.movies.map(item => {
            if (item.id === id) {
              item.favourite = !item.favourite
            }
            return item
          })
        },
        async onRemoveHandler(id) {
          try {
            this.movies = this.movies.filter(m => m.id !== id)
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
          } catch (error) {
            alert(error.message)
          }
        },
        onSearchHandler(arr, term) {
          if (term.length == 0) {
            return arr
          }

          return arr.filter(c => c.name.toLowerCase().indexOf(term) > -1)
        },
        onFilterHandler (arr, filter) {
          switch (filter) {
            case 'popular':
                return arr.filter(c => c.like)
              break;
            case 'mostViewers':
              return arr.filter(c => c.favourite <= 100)
            default:
              return arr;
          }
        },
        updateTermHandler(term) {
          this.term = term
        }, 
        updateFilterHandler (filter) {
          this.filter = filter
        },
        async fetchMovie() {
          try {
            this.isLoading = true
              const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                  _limit: this.limit,
                  _page: this.page
                }
              })
              const newArr = response.data.map(item => ({
                id: item.id,
                name: item.title,
                like: false,
                favourite: false,
                viewers: item.id * 10
              }))
              this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
              this.movies = newArr
              console.log(this.totalPages);
          } catch (error) {
            console.log(error);
          } finally {
            this.isLoading = false
          }
        },
        pageChangeHandler(page) {
          this.page = page
        }
      },
      mounted() {
        this.fetchMovie()
      },
      watch: {
        page() {
          this.fetchMovie()
        }
      }
    }

</script>

<style>
  .app {
    height: 100vh;
    color: #000;
  }

  .content {
    width: 1000px;
    min-height: 700px;
    background-color: #fff;
    margin: 0 auto;
    padding: 5rem 0;
  }
  
  .search-pannel{
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #fcfcf5;
    border-radius: 4px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.15);
  }
</style>