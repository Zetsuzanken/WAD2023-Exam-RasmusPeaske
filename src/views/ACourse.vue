<template>
  <div class="ACourse">
    <h3>Course Details</h3>
    <!-- Display course details using fetched data based on the route parameter -->
  </div>
</template>

<script>
export default {
  name: "ACourse",
  data() {
    return {
      courseId: null,
    };
  },
  methods: {
    fetchCourseData() {
      
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

</style>
