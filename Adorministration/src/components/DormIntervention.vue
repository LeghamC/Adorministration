<template>
    <div class="dorm-intervention">
        <span class="intervention-id">#{{ intervention.id }}</span>
        <span class="intervention-status">{{ intervention.status }}</span>
        <span class="intervention-author">By {{ intervention.author.id }}</span>
        <span class="intervention-author">By {{ intervention.author.name }}</span>
        <h3 class="intervention-category">{{ intervention.category }}</h3>
        <span class="intervention-date">{{ intervention.dateRequested }}</span>
        <p class="intervention-snippet">{{ truncatedContent }}</p>
        <router-link :to="`/intervention/${intervention.id}`" class="read-more">Read More →</router-link>
    </div>
</template>

<script>
export default {
    name: "DormIntervention",
    props: {
        intervention: {
            type: Object,
            required: true,
        },
    },
    computed: {
        truncatedContent() {
            // Limit the preview to 100 characters
            if (this.intervention.description.length > 100) {
                return this.intervention.description.slice(0, 100) + "...";
            }
            return this.intervention.description;
        },
    },
};
</script>

<style scoped>
.dorm-intervention {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 15px;
    background-color: #efefef;
    transition: box-shadow 0.3s;
}

.dorm-intervention:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.intervention-title {
    margin-top: 40px;
    font-size: 1.4em;
    color: #222;
}

.intervention-author,
.intervention-date {
    font-size: 0.9em;
    color: #777;
}

.intervention-author {
    margin-bottom: 20px;
}

.intervention-date {
    display: flex;
    justify-content: flex-end;
    margin-top: -30px
}

.intervention-category {
    display: flex;
    justify-content: flex-start;
    width: fit-content;
    margin-right: auto;
    padding: 6px 12px;
    margin-top: 20px;
    background-image: linear-gradient(90deg, #a40eefc0, #1282f3bd);
    color: white;
    font-weight: bold;
    border-color: #a40eef70;
    border-radius: 30px;
}

.intervention-snippet {
    color: #444;
    margin-bottom: 10px;
    border-bottom: 1px solid #d4d4d4;
    padding-bottom: 35px;
}

.read-more {
    display: flex;
    justify-content: flex-end;
    width: fit-content;
    margin-left: auto;
    color: #0077cc;
    font-weight: 500;
    text-decoration: none;
}


.read-more:hover {
    text-decoration: underline;
}
</style>