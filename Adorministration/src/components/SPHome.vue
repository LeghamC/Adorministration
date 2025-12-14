<template>
    <div class="page">
      <h2>Service Personnel Home Page</h2>
  
      <ul>
        <li v-for="i in interventions" :key="i.InterventionID">
          {{ i.Description }} — {{ i.Status }}
  
          <button @click="update(i.InterventionID, 'Accepted')">
            Accept
          </button>
          <button @click="update(i.InterventionID, 'Refused')">
            Refuse
          </button>
          <button @click="update(i.InterventionID, 'Completed')">
            Complete
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from "../api";
  
  export default {
    data() {
      return {
        interventions: []
      };
    },
    async mounted() {
      const res = await api.get("/interventions");
      this.interventions = res.data;
    },
    methods: {
      async update(id, status) {
        await api.post("/interventions/update", {
          interventionId: id,
          status
        });
        const res = await api.get("/interventions");
        this.interventions = res.data;
      }
    }
  };
  </script>
  