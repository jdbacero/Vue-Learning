<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <p>Register for the Event</p>
    <button @click="register">Register me</button>
</template>

<script>
import { useGStore } from '@/store/GStore';
export default {
  setup() {
    const GStore = useGStore()
    return {
      GStore
    }
  },
  props: ['event'],
  methods: {
    register() {
      // Call API
      // Assume API call worked.
      this.GStore.showMessage(`You are successfully registered for ${this.event.title}`)

      this.$router.push({
        name: 'EventDetails',
        params: {id: this.event.id}  
      })
    }
  }
};
</script>
