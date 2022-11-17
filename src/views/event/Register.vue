<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <p>Register for the Event</p>
    <button @click="register">Register me</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      // Call API
      // Assume API call worked.

      this.$router.push({
        name: 'EventDetails',
        params: {id: this.event.id}  
      })
    }
  }
};
</script>
