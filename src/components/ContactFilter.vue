<template>
  <form class="contact-filter card">
    <input
      @input="debouncedUpdate"
      :value="filterBy.term"
      type="text"
      name="text"
      placeholder="Search for..."
    />
  </form>
</template>

<script>
import { utilService } from "../services/utilService";

export default {
  props: ["filterBy"],
  emits: ["update:filterBy", "termUpdated"],
  created() {
    this.debouncedUpdate = utilService.debounce(this.update, 400);
  },
  methods: {
    update(e) {
      this.$emit("update:filterBy", { term: e.target.value });
      this.$emit("termUpdated");
    },
  },
};
</script>
