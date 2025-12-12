<template>
    <div class="category-filter">
        <button v-for="category in categories" :key="category"
            :class="['category-btn', { active: category === selectedCategory }]"
            @click="$emit('category-selected', category)">
            {{ category }}
        </button>
    </div>
</template>

<script>
export default {
    name: "CategoryFilter",
    props: {
        categories: {
            type: Array,
            required: true,
        },
        selectedCategory: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.category-filter {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: -80px;
    margin-bottom: 20px;}

.category-btn {
    padding: 6px 12px;
    border-radius: 30px;
    border: 1px solid #a40eefd5;
    color: #a40eefd5;
    background: #f7f7f7;
    cursor: pointer;
    font-size: 0.95em;
    transition: all 0.2s;
}

.category-btn:hover {
    background: #e0e0e0;
    border-radius: 30px;
}

.category-btn.active {
    background-image: linear-gradient(90deg, #a40eefc0, #1282f3bd);
    color: white;
    font-weight: bold;
    border-color:#a40eef70;
    border-radius: 30px;
}
</style>