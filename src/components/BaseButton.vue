<template>
  <a :href="link" class="btn">
    <slot />
  </a>
</template>

<script setup>
defineProps({
  link: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.btn {
  display: inline-block;
  padding: 10px 18px;
  margin-top: 1rem;
  background: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: 0.2s;
}

.btn:hover {
  background: #36996f;
}
</style>
