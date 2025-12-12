<template>
    <div class="dorm-form">
        <h2>{{ isEditMode ? "Edit Intervention Request" : "Create New Intervention Request" }}</h2>

        <form @submit.prevent="handleSubmit">
            <label>Intervention ID: {{ this.id }}</label>

            <label>Status *</label>
            <select v-model="form.status">
                <option disabled value="">Select a status...</option>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>

            <label>Author ID *</label>
            <input v-model="form.author.id" type="number" placeholder="Enter your id..." />

            <label>Author Name *</label>
            <input v-model="form.author.name" type="text" placeholder="Enter your name..." />

            <label>Category *</label>
            <select v-model="form.category">
                <option disabled value="">Select a type of intervention...</option>
                <option>Cleaning</option>
                <option>Making repair</option>
            </select>

            <label>Date requested for intervention *</label>
            <input v-model="form.dateRequested" type="date" />

            <label>Description *</label>
            <TextEditor v-model="form.description" :is-multiline="true" />


            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

            <div class="buttons">
                <button type="button" class="btn cancel" @click="cancelForm">Cancel</button>
                <button type="submit" class="btn publish">
                    {{ isEditMode ? "💾 Save Changes" : "📝 Publish Intervention Request" }}
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import TextEditor from "./TextEditor.vue";

export default {
    name: "DormForm",
    components: { TextEditor },
    props: {
        interventions: {
            type: Array,
            required: true,
        },
        id: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            form: {
                status: "",
                author: {
                    id: "",
                    name: "",
                },
                category: "",
                description: "",
                dateRequested: "",
            },
            errorMessage: "",
        };
    },
    computed: {
        isEditMode() {
            return !!this.id;
        },
    },
    created() {
        if (this.isEditMode) {
            const existingIntervention = this.interventions.find((p) => p.id === parseInt(this.id));
            if (existingIntervention) {
                this.form = { ...existingIntervention };
            }
        }
    },
    methods: {
        validateForm() {
            const { status, author, category, description } = this.form;
            if (!status || !author || !category || !description) {
                this.errorMessage = "All fields are required to make a request.";
                return false;
            }
            this.errorMessage = "";
            return true;
        },
        handleSubmit() {
            if (!this.validateForm()) return;

            if (this.isEditMode) {
                if (confirm("Are you sure you want to save these changes?")) {
                    this.$emit("update-intervention", { ...this.form });
                    this.$router.push("/");
                }

            } else {
                if (confirm("Are you sure you want to make this intervention request?")) {
                    this.$emit("add-intervention", { ...this.form });
                    this.$router.push("/");
                }
            }
        },
        cancelForm() {
            this.$router.back();
        },
    },
};
</script>

<style scoped>
h2 {
    font-size: 1.8em;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.blog-form {
    background-color: #efefef;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-right: 20px;
}

label {
    font-weight: 600;
    margin-top: 5px;
    color: #333;
}

input,
select,
textarea {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 8px;
    font-size: 1em;
}

.error {
    color: #e53935;
    font-weight: bold;
    text-align: center;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
}

.btn {
    border: none;
    border-radius: 6px;
    padding: 8px 14px;
    cursor: pointer;
    font-size: 0.95em;
}

.btn.publish {
    background-image: linear-gradient(90deg, #a40eefc0, #1282f3bd);
    color: white;
    font-weight: bold;
}

.btn.cancel {
    background: #494848d4;
    color: white;
    font-weight: bold;
}

.btn:hover {
    opacity: 0.8;
}
</style>