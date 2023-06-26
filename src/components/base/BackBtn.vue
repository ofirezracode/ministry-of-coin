<template>
  <RouterLink :to="`/${url}`">
    <button><span class="arrow">&#8592;</span>Back</button>
  </RouterLink>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
};
</script>
