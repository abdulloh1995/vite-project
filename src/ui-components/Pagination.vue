<template>
    <nav class="mt-3" aria-label="...">
        <ul class="pagination pagination-sm pe-auto">
            <li v-for="pageNumber in totalPages" :key="pageNumber" :class="{'active': pageNumber === page}" @click="pageChangeHandler(pageNumber)">
                <span class="page-link text-dark m-1" :class="{'text-white': pageNumber === page}">{{ pageNumber }}</span>
            </li>
        </ul>
    </nav>
</template>   

<script>
export default {
    data() {
        return {
            page: 1
        }
    },
    name: 'Pagination',
    props: {
        pageChangeHandler: {
            type: Function,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    methods: {
        pageHandeler(page) {

        }
    }
}


</script>

<style>
    
</style>