<template>
  <div class="ACourse">
    <h3>{{ courseData.coursename }} - {{ courseData.coursecode }} - {{ courseData.courseects }} ECTS</h3>
    
    <div class="form-container">
      <div class="form-group">
        <label>Max Number of Students:</label>
        <p>{{ courseData.studentsnumbers }}</p>
      </div>

      <div class="form-group">
        <label>Number of Groups:</label>
        <p>{{ courseData.groupsnumbers }}</p>
      </div>

      <div class="form-group">
        <label>Course Description:</label>
        <p>{{ courseData.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ACourse",
  data() {
    return {
      courseId: null,
      courseData: {},
    };
  },
  methods: {
    fetchCourseData() {
      fetch(`http://localhost:3000/api/courses/${this.courseId}`)
        .then((response) => response.json())
        .then((data) => {
          this.courseData = data;
        })
        .catch((err) => console.log(err.message));
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
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}
</style>
