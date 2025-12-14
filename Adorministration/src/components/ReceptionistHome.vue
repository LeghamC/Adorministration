<template>
    <div class="page">
      <h2>Receptionist Home Page</h2>
  
      <h3>Submit Intervention</h3>
      <textarea v-model="interventionDesc"></textarea>
      <button @click="submitIntervention">Submit</button>
  
      <h3>Record Student Behavior</h3>
      <input v-model="studentId" placeholder="Student ID" />
      <input v-model="behaviorDesc" placeholder="Description" />
      <input v-model.number="points" placeholder="Points" />
  
      <button @click="recordBehavior">Record</button>
  
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script>
  import api from "../api";
  
  export default {
    data() {
      return {
        interventionDesc: "",
        studentId: "",
        behaviorDesc: "",
        points: 0,
        message: ""
      };
    },
    methods: {
      async submitIntervention() {
        if (!this.interventionDesc) {
          this.message = "Description required";
          return;
        }
  
        await api.post("/interventions", {
          userId: 2,
          description: this.interventionDesc
        });
  
        this.message = "Intervention submitted";
        this.interventionDesc = "";
      },
      async recordBehavior() {
        if (!this.studentId || !this.behaviorDesc) {
          this.message = "Invalid behavior record";
          return;
        }
  
        await api.post("/behavior", {
          userId: this.studentId,
          description: this.behaviorDesc,
          points: this.points
        });
  
        this.message = "Behavior recorded";
      }
    }
  };
  </script>
  