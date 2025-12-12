<template>
    <div v-if="intervention" class="dorm-intervention-detail">
        <span class="intervention-id">#{{ intervention.id }}</span>
        <span class="intervention-status">{{ intervention.status }}</span>
        <span class="intervention-author">✍️ By #{{ intervention.author.id }}: {{ intervention.author.name }}</span>
        <span class="intervention-category">{{ intervention.category }}</span>
        <span class="intervention-date">{{ intervention.dateRequested }}</span>
        <p class="intervention-content">{{ intervention.content }}</p>

        <div class="actions">
            <router-link to="/" class="btn back">← Back to Home</router-link>
            <div class="right-button">
                <router-link :to="`/edit/${intervention.id}`" class="btn edit">✏️ Edit</router-link>
                <button @click="deleteIntervention" class="btn delete">🗑️ Delete</button>
            </div>
        </div>
    </div>

    <div v-else class="not-found">
        <p>Intervention request not found.</p>
        <router-link to="/" class="btn back">Go Back</router-link>
    </div>
</template>

<script>
export default {
    name: "DormInterventionDetail",
    props: {
        interventions: {
            type: Array,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    computed: {
        intervention() {
            return this.interventions.find((p) => p.id === parseInt(this.id));
        },
    },
    methods: {
        deleteIntervention() {
            if (confirm("Are you sure you want to delete this intervention request?")) {
                this.$emit("delete-intervention", this.intervention.id);
                this.$router.push("/");
            }
        },
    },
};
</script>

<style scoped>
.dorm-detail {
    background-color: #efefef;
    border-radius: 12px;
    padding: 50px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}


.intervention-author, .intervention-date {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 15px;
}

.intervention-date{
    display: flex;
    justify-content: flex-end;
}

.intervention-category {
    padding: 6px 12px;
    background-image: linear-gradient(90deg, #a40eefc0, #1282f3bd);
    color: white;
    font-weight: bold;
    border-color:#a40eef70;
    border-radius: 30px;
}

.intervention-content {
    font-size: 1.05em;
    color: #333;
    line-height: 1.6;
    margin-bottom: 35px;
    white-space: pre-wrap;
    border-top: 1px solid #d4d4d4;
    padding-top: 35px;
    border-bottom: 1px solid #d4d4d4;
    padding-bottom: 35px;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.right-button {
    display: flex;
    gap: 5px;
}

.btn {
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 0.95em;
    cursor: pointer;
    border: none;
    transition: 0.3s;
}

.btn.edit {
    background-image: linear-gradient(90deg, #a40eefc0, #1282f3bd);
    color: white;
    font-weight: bold;
}

.btn.delete {
    background: #e53935;
    color: white;
    font-weight: bold;
}

.btn.back {
    background: #494848d4;
    color: white;
    font-weight: bold;
}

.btn:hover {
    opacity: 0.8;
}

.not-found {
    text-align: center;
    color: #666;
}
</style>