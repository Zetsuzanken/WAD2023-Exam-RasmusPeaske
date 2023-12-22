<template>
  <div class="courses-container">
    <div class="course-details">
      <div class="detail-row">
        <strong>Course name:</strong>
        <p>{{ course.coursename }}</p>
      </div>
      <div class="detail-row">
        <strong>Course code:</strong>
        <router-link :to="{ name: 'ACourse', params: { id: course.id } }">
          {{ course.coursecode }}
        </router-link>
      </div>
      <div class="detail-row">
        <strong>ECTS:</strong>
        <p>{{ course.courseects }}</p>
      </div>
      <div class="detail-row">
        <strong>Students:</strong>
        <p>{{ course.studentsnumbers }}</p>
      </div>
      <div class="detail-row">
        <strong>Groups:</strong>
        <p>{{ course.groupsnumbers }}</p>
      </div>
      <div class="detail-row">
        <strong>Description:</strong>
        <p>{{ course.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: Object,
  },
};
</script>

<style scoped>
.courses-container {
  display: flex;
}

.course-details {
  display: flex;
  flex-direction: row;
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 15px;
}

.detail-row {
  margin-right: 20px;
}

.detail-row strong {
  display: block;
  margin-bottom: 5px;
}

.router-link-exact-active {
  color: #00f;
}
</style>
