<template>
  <div class="page">
    <h2>Student Home Page</h2>

    <h3>Available Rooms</h3>
    <button @click="loadRooms">Load Rooms</button>

    <ul>
      <li v-for="room in rooms" :key="room.RoomID">
        Room {{ room.RoomID }}
        <button @click="assignRoom(room.RoomID)">Choose</button>
      </li>
    </ul>

    <h3>Payment</h3>
    <button @click="payRoom">Pay for Room</button>

    <h3>Intervention Request</h3>
    <textarea
      v-model="description"
      placeholder="Describe the issue"
    ></textarea>
    <button @click="submitRequest">Submit</button>

    <p>{{ message }}</p>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      rooms: [],
      description: "",
      message: ""
    };
  },
  methods: {
    async loadRooms() {
      const res = await api.get("/rooms/available");
      this.rooms = res.data;
    },
    async assignRoom(roomId) {
      await api.post("/rooms/assign", {
        userId: 1, // demo user
        roomId
      });
      this.message = "Room assigned successfully";
    },
    async payRoom() {
      await api.post("/rooms/pay", { userId: 1 });
      this.message = "Payment successful";
    },
    async submitRequest() {
      if (!this.description) {
        this.message = "Description is required";
        return;
      }

      await api.post("/interventions", {
        userId: 1,
        description: this.description
      });
      this.message = "Request submitted";
      this.description = "";
    }
  }
};
</script>
