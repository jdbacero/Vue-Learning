<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <p>Register for the Event</p>
    <button @click="register">Register me</button>
</template>

<script>
export default {
  props: ['event'],
  inject: ['GStore'],
  methods: {
    register() {
      // Call API
      // Assume API call worked.

      this.GStore.flashMessage = `You are successfully registered for ${this.event.title}`

      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)

      this.$router.push({
        name: 'EventDetails',
        params: {id: this.event.id}  
      })
    }
  }
};
</script>
