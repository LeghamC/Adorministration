<template>
    <div class="page">
      <h2>Administrator Home Page</h2>
  
      <h3>Behavior Records</h3>
      <ul>
        <li v-for="r in records" :key="r.RecordID">
          Student {{ r.UserID }} —
          {{ r.Description }} —
          Points: {{ r.BehaviorPoints }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import api from "../api";
  
  export default {
    data() {
      return {
        records: []
      };
    },
    async mounted() {
      const res = await api.get("/behavior");
      this.records = res.data;
    }
  };
  </script>
  