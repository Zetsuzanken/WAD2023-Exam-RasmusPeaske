<template>
  <div class="ACourse">
    <div class="form-container">
      <h3>{{ courseData.coursename }} - {{ courseData.coursecode }} - {{ courseData.courseects }} ECTS</h3>
      <div class="form-group">
        <label>Max Number of Students:</label>
        <input v-model="updatedData.studentsnumbers" type="number" />
      </div>

      <div class="form-group">
        <label>Number of Groups:</label>
        <input
          v-model="updatedData.groupsnumbers"
          type="number"
          :class="{ 'invalid-input': isInvalidGroups }"
        />
      </div>

      <div class="form-group">
        <label>Course Description:</label>
        <textarea v-model="updatedData.description"></textarea>
      </div>
    </div>

    <!-- Button for updating course data -->
    <button @click="updateCourseData" :disabled="isUpdateDisabled">Update Course</button>
  </div>
</template>


<script>
export default {
  name: "ACourse",
  data() {
    return {
      courseId: null,
      courseData: {},
      updatedData: {
        studentsnumbers: null,
        groupsnumbers: null,
        description: "",
      },
    };
  },
  computed: {
    isInvalidGroups() {
      return (
        this.updatedData.groupsnumbers &&
        this.updatedData.studentsnumbers > 30 * this.updatedData.groupsnumbers
      );
    },
    isUpdateDisabled() {
      return this.isInvalidGroups;
    },
  },
  methods: {
    fetchCourseData() {
      // Fetch course data based on this.courseId
      fetch(`http://localhost:3000/api/courses/${this.courseId}`)
        .then((response) => response.json())
        .then((data) => {
          this.courseData = data;
          // Initialize updatedData with the existing course data
          this.updatedData.studentsnumbers = data.studentsnumbers;
          this.updatedData.groupsnumbers = data.groupsnumbers;
          this.updatedData.description = data.description;
        })
        .catch((err) => console.log(err.message));
    },
    updateCourseData() {
      // Send the updated data to the backend
      fetch(`http://localhost:3000/api/courses/${this.courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.updatedData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response, e.g., show a success message
          console.log("Course data updated:", data);
          // Optionally, you can re-fetch the course data to display the updated values
          this.fetchCourseData();

          // Redirect to the Courses.vue page
          this.$router.push("/courses");
        })
        .catch((err) => console.error("Error updating course data:", err));
    },
  },
  mounted() {
    this.courseId = this.$route.params.id;
    this.fetchCourseData();
    console.log("mounted");
  },
};
</script>

<style scoped>
/* Add your styles as needed */
.form-container {
  max-width: 600px; /* Adjust the maximum width as needed */
  margin: 20px auto; /* Center the form container */
  background-color: #f5f0e1; /* Light brown background */
  padding: 20px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.invalid-input {
  background-color: red;
}

button {
  cursor: pointer;
  background-color: #87cefa;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
}
</style>


