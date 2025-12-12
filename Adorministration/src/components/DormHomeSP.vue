<template>
    <div class="dorm-list">
        <h2>All intervention resquests</h2>

        <CategoryFilter :categories="categories" :selected-category="selectedCategory"
            @category-selected="filterByCategory" />

        <div v-if="filteredInterventions.length" class="interventions-container">
            <DormIntervention v-for="post in filteredInterventions" :key="intervention.id" :intervention="intervention" />
        </div>

        <p v-else class="no-intervention">No intervention request found in this category.</p>
    </div>
</template>

<script>
import DormIntervention from './DormIntervention.vue'
import CategoryFilter from './CategoryFilter.vue'

export default {
    name: 'DormHomeSP',
    components: {
        DormIntervention,
        CategoryFilter,
    },
    props: {
        interventions: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            selectedCategory: 'All',
            categories: ['All', 'Cleaning', 'Repairs'],
        };
    },
    computed: {
        filteredInterventions() {
            if (this.selectedCategory === 'All') {
                return this.interventions;
            }
            return this.interventions.filter(
                (intervention) => intervention.category === this.selectedCategory
            );
        },
    },
    methods: {
        filterByCategory(category) {
            this.selectedCategory = category;
        },
    },
};
</script>


<style scoped>

.dorm-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

h2 {
    font-size: 1.6em;
    color: #333;
}

.interventions-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
}

.no-interventions {
    font-weight: bold;
    text-align: center;
    color: black;
    margin-top: 20px;
}
</style>