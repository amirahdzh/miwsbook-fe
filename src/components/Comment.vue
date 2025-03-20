<template>
  <div class="comment">
    <strong>{{ comment.user.name }}</strong
    >: {{ comment.content }}
  </div>
</template>

<script>
export default {
  props: ["comment"],
};
</script>

<style scoped>
.comment {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
</style>
